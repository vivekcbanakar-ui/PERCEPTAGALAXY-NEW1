import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const PLAN_LIMITS = {
  starter: 1,
  growth: 3,
  scale: 10,
};

export const PLAN_NAMES = ["starter", "growth", "scale"];

// Default free trial = starter tier (1 competitor)
export const DEFAULT_PLAN = "starter";
export const DEFAULT_LIMIT = PLAN_LIMITS[DEFAULT_PLAN];

/**
 * Get the user's current active subscription
 * Returns the highest-tier active plan, or null if none
 */
export async function getActiveSubscription(userId) {
  if (!userId) return null;

  const subs = await db
    .select()
    .from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);

  return subs[0] || null;
}

/**
 * Returns the user's plan tier + competitor limit
 */
export async function getUserPlan(userId) {
  const sub = await getActiveSubscription(userId);

  if (sub && PLAN_NAMES.includes(sub.plan)) {
    return {
      plan: sub.plan,
      limit: PLAN_LIMITS[sub.plan],
      isPaid: true,
      subscription: sub,
    };
  }

  return {
    plan: DEFAULT_PLAN,
    limit: DEFAULT_LIMIT,
    isPaid: false,
    subscription: null,
  };
}

/**
 * Can the user add another competitor?
 */
export async function canAddCompetitor(userId, currentCount) {
  const { limit, plan, isPaid } = await getUserPlan(userId);
  return {
    allowed: currentCount < limit,
    limit,
    current: currentCount,
    plan,
    isPaid,
    upgradeRequired: !isPaid || currentCount >= limit,
  };
}
