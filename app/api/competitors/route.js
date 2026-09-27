import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import { db } from "@/db";
import { competitors } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { canAddCompetitor, getUserPlan } from "@/lib/subscription";
import { eq, and, desc } from "drizzle-orm";

// GET /api/competitors — list current user's competitors
export async function GET() {
  try {
    await ensureSchema();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userCompetitors = await db
      .select()
      .from(competitors)
      .where(eq(competitors.userId, session.user.id))
      .orderBy(desc(competitors.addedAt));

    const planInfo = await getUserPlan(session.user.id);

    return new Response(
      JSON.stringify({
        competitors: userCompetitors,
        plan: planInfo.plan,
        limit: planInfo.limit,
        isPaid: planInfo.isPaid,
        count: userCompetitors.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("List competitors error:", error);
    return new Response(JSON.stringify({ error: "Failed to load competitors: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST /api/competitors — add a competitor
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
    const { name, url } = body;

    if (!name?.trim() || !url?.trim()) {
      return new Response(JSON.stringify({ error: "Name and URL are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check current count
    const existing = await db
      .select()
      .from(competitors)
      .where(eq(competitors.userId, session.user.id));

    const check = await canAddCompetitor(session.user.id, existing.length);

    if (!check.allowed) {
      return new Response(
        JSON.stringify({
          error: `You've reached your ${check.plan} plan limit (${check.limit} competitor${
            check.limit !== 1 ? "s" : ""
          }). Upgrade to add more.`,
          upgradeRequired: true,
          currentPlan: check.plan,
          limit: check.limit,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const competitor = {
      id: crypto.randomUUID(),
      userId: session.user.id,
      name: name.trim(),
      url: normalizedUrl,
    };

    await db.insert(competitors).values(competitor);

    return new Response(
      JSON.stringify({
        success: true,
        competitor,
        remaining: check.limit - existing.length - 1,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Add competitor error:", error);
    return new Response(JSON.stringify({ error: "Failed to add competitor: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE /api/competitors — remove a competitor
export async function DELETE(req) {
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
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db
      .delete(competitors)
      .where(and(eq(competitors.id, id), eq(competitors.userId, session.user.id)));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete competitor error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
