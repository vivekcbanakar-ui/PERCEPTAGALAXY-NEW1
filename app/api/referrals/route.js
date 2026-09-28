import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import { db } from "@/db";
import { referrals, users } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { eq, and, desc } from "drizzle-orm";
import { generateReferralCode } from "@/lib/referral";

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

    // Get or create the user's referral code
    let userReferrals = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referrerUserId, session.user.id))
      .orderBy(desc(referrals.createdAt))
      .limit(1);

    if (userReferrals.length === 0) {
      // Generate a fresh code
      const code = generateReferralCode(session.user.name || session.user.email);
      const newReferral = {
        id: crypto.randomUUID(),
        code,
        referrerUserId: session.user.id,
        referredEmail: null,
        status: "pending",
        rewardAmount: 0,
      };
      await db.insert(referrals).values(newReferral);
      userReferrals = [newReferral];
    }

    const myCode = userReferrals[0].code;

    // Get all referrals made by this user
    const allMine = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referrerUserId, session.user.id));

    const stats = {
      code: myCode,
      totalInvites: allMine.length,
      converted: allMine.filter((r) => r.status === "converted" || r.status === "paid").length,
      pendingReward: allMine
        .filter((r) => r.status === "paid")
        .reduce((sum, r) => sum + (r.rewardAmount || 0), 0),
      referrals: allMine,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Referrals error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
