import { getServerSession } from "next-auth";
import { authOptions } from "../../auth-options";
import { db } from "@/db";
import { users, leads, subscriptions, competitors } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { eq, and, count } from "drizzle-orm";

const ADMIN_EMAILS = ["vivekcbanakar@gmail.com"];

// Plan price map for MRR
const PLAN_PRICES = {
  starter: 99,
  growth: 399,
  scale: 999,
};

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

    // Counts
    const allUsers = await db.select().from(users);
    const allLeads = await db.select().from(leads);
    const allSubs = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.status, "active"));
    const allCompetitors = await db.select().from(competitors);

    // Calculate MRR
    let mrr = 0;
    for (const sub of allSubs) {
      mrr += PLAN_PRICES[sub.plan] || 0;
    }

    return new Response(
      JSON.stringify({
        usersCount: allUsers.length,
        leadsCount: allLeads.length,
        subscribersCount: allSubs.length,
        competitorsCount: allCompetitors.length,
        mrr,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Admin stats error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
