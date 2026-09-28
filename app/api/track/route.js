import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import { db } from "@/db";
import { competitors, snapshots, insights } from "@/db/schema";
import { scrapeUrl, hashContent, diffContent, summarizeChange } from "@/lib/scraper";
import { ensureSchema } from "@/db/migrate";
import { eq, desc, and } from "drizzle-orm";

// POST /api/track — track a competitor (scrape, snapshot, diff, insight)
export async function POST(req) {
  try {
    await ensureSchema();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { competitorId } = body;

    if (!competitorId) {
      return new Response(JSON.stringify({ error: "competitorId required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the competitor
    const comp = await db
      .select()
      .from(competitors)
      .where(and(eq(competitors.id, competitorId), eq(competitors.userId, session.user.id)))
      .limit(1);

    if (comp.length === 0) {
      return new Response(JSON.stringify({ error: "Competitor not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const competitor = comp[0];

    // Scrape the URL
    const scraped = await scrapeUrl(competitor.url);
    if (!scraped.content) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch URL: ${scraped.error}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash + store as new snapshot
    const newHash = hashContent(scraped.content);

    // Get previous snapshot for diff
    const prevSnapshot = await db
      .select()
      .from(snapshots)
      .where(eq(snapshots.competitorId, competitorId))
      .orderBy(desc(snapshots.fetchedAt))
      .limit(1);

    // Compute diff
    let diff = null;
    if (prevSnapshot.length > 0) {
      const prevContent = prevSnapshot[0].contentExcerpt || ""; // we only store excerpts
      // For real diff, we'd need full content. Limitation: we only have excerpt.
      // Heuristic: compare hashes + lengths
      if (prevSnapshot[0].contentHash !== newHash) {
        diff = {
          changed: true,
          oldLength: prevSnapshot[0].contentLength,
          newLength: scraped.content.length,
          delta: scraped.content.length - prevSnapshot[0].contentLength,
        };
      }
    } else {
      diff = { changed: true, summary: "First snapshot — no previous data" };
    }

    // Save new snapshot
    const snapshotId = crypto.randomUUID();
    await db.insert(snapshots).values({
      id: snapshotId,
      competitorId,
      url: competitor.url,
      title: scraped.title,
      contentHash: newHash,
      contentLength: scraped.content.length,
      contentExcerpt: scraped.content.substring(0, 5000),
    });

    // If changed, generate insight
    let insight = null;
    if (diff && diff.changed) {
      const summary = await summarizeChange(diff, competitor.name);
      const insightId = crypto.randomUUID();
      await db.insert(insights).values({
        id: insightId,
        competitorId,
        snapshotId,
        type: "other",
        severity: Math.abs(diff.delta || 0) > 500 ? "high" : "medium",
        title: `${competitor.name} changed`,
        summary,
        rawDiff: diff.excerpt || null,
      });

      insight = {
        id: insightId,
        title: `${competitor.name} changed`,
        summary,
        severity: Math.abs(diff.delta || 0) > 500 ? "high" : "medium",
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        snapshot: {
          id: snapshotId,
          url: competitor.url,
          title: scraped.title,
          contentLength: scraped.content.length,
          fetchedAt: new Date(),
        },
        diff,
        insight,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Track error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET /api/track?competitorId=X — get insights + snapshots for a competitor
export async function GET(req) {
  try {
    await ensureSchema();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const competitorId = url.searchParams.get("competitorId");

    if (!competitorId) {
      return new Response(JSON.stringify({ error: "competitorId required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify ownership
    const comp = await db
      .select()
      .from(competitors)
      .where(and(eq(competitors.id, competitorId), eq(competitors.userId, session.user.id)))
      .limit(1);

    if (comp.length === 0) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allInsights = await db
      .select()
      .from(insights)
      .where(eq(insights.competitorId, competitorId))
      .orderBy(desc(insights.createdAt))
      .limit(50);

    const allSnapshots = await db
      .select()
      .from(snapshots)
      .where(eq(snapshots.competitorId, competitorId))
      .orderBy(desc(snapshots.fetchedAt))
      .limit(20);

    return new Response(
      JSON.stringify({
        insights: allInsights,
        snapshots: allSnapshots,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get track error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
