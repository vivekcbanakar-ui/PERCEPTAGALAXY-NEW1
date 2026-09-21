import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import Razorpay from "razorpay";
import { z } from "zod";

// USD pricing — amounts in dollars; Razorpay expects smallest currency unit (cents) so we *100
const PLANS = {
  starter: { price: 99, description: "Starter — Track your #1 threat" },
  growth: { price: 399, description: "Growth — Built for founders who want to WIN" },
  scale: { price: 999, description: "Scale — For agencies & scaling founders" },
};

const checkoutSchema = z.object({
  planName: z.enum(["starter", "growth", "scale"]),
  email: z.string().email(),
});

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { planName, email } = checkoutSchema.parse(body);

    const plan = PLANS[planName];
    if (!plan) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
      });
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order in USD
    const order = await razorpay.orders.create({
      amount: plan.price * 100, // USD cents
      currency: "USD",
      receipt: `order_${Date.now()}`,
      notes: {
        plan: planName,
        email: email,
      },
    });

    return new Response(
      JSON.stringify({
        orderId: order.id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        amount: plan.price * 100,
        currency: "USD",
        planName: plan.description,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Checkout failed" }),
      { status: 500 }
    );
  }
}
