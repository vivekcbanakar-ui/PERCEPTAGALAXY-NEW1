import { db } from "@/db";
import { leads } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";

export async function POST(req) {
  try {
    await ensureSchema();

    const body = await req.json();
    const { email, source, competitor, message } = body;

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lead = {
      id: crypto.randomUUID(),
      email,
      source: source || "unknown",
      competitor: competitor || null,
      message: message || null,
    };

    await db.insert(leads).values(lead);
    console.log("New lead:", email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    await ensureSchema();
    const all = await db.select().from(leads);
    return new Response(
      JSON.stringify({
        count: all.length,
        recent: all.slice(-5).map((l) => ({ email: l.email, source: l.source })),
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "DB unavailable: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
