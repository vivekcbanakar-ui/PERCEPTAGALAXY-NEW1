import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import { db } from "@/db";
import { competitors } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { eq, desc } from "drizzle-orm";

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

    return new Response(JSON.stringify({ competitors: userCompetitors }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    // Validate
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

    return new Response(JSON.stringify({ success: true, competitor }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Add competitor error:", error);
    return new Response(JSON.stringify({ error: "Failed to add competitor" }), {
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
      .where(eq(competitors.id, id));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete competitor error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
