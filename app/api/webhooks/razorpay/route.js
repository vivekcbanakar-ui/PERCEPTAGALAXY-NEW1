import crypto from "crypto";
import { z } from "zod";
import { db } from "@/db";
import { users, subscriptions } from "@/db/schema";
import { ensureSchema } from "@/db/migrate";
import { eq } from "drizzle-orm";

const webhookSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  planName: z.string(),
  userEmail: z.string().email(),
});

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const message = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  return expectedSignature === signature;
}

export async function POST(req) {
  try {
    await ensureSchema();

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planName,
      userEmail,
    } = webhookSchema.parse(body);

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.warn(`Invalid signature for order ${razorpay_order_id}`);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
      });
    }

    // Find or create user
    let user = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);

    if (user.length === 0) {
      const newUser = {
        id: crypto.randomUUID(),
        name: userEmail.split("@")[0],
        email: userEmail,
        emailVerified: new Date(),
      };
      await db.insert(users).values(newUser);
      user = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
    }

    const userId = user[0].id;

    // Create/update subscription
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1); // 30 days

    await db.insert(subscriptions).values({
      id: crypto.randomUUID(),
      userId,
      plan: planName,
      status: "active",
      razorpaySubscriptionId: razorpay_payment_id,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
    });

    console.log(`✅ Subscription created for ${userEmail} - Plan: ${planName}`);

    return new Response(
      JSON.stringify({ success: true, message: "Subscription active" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Webhook failed" }),
      { status: 500 }
    );
  }
}
