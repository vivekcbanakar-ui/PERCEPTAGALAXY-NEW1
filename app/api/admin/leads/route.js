import { getServerSession } from "next-auth";
import { authOptions } from "../../auth-options";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { desc } from "drizzle-orm";

const ADMIN_EMAILS = ["vivekcbanakar@gmail.com"];

export async function GET() {
  try {
    await ensureSchema();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(500);

    return new Response(JSON.stringify({ leads: allLeads }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Admin leads error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
