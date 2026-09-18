import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import Razorpay from "razorpay";
import { z } from "zod";

const PLANS = {
  starting: { price: 4900, description: "Starting Plan" },
  pro: { price: 12000, description: "Pro Plan" },
  max: { price: 16000, description: "Max Plan" },
};

const checkoutSchema = z.object({
  planName: z.enum(["starting", "pro", "max"]),
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

    // Create order
    const order = await razorpay.orders.create({
      amount: plan.price * 100, // Razorpay expects paise
      currency: "INR",
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
