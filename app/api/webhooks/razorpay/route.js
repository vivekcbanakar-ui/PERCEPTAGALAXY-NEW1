import crypto from "crypto";
import { z } from "zod";

const webhookSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  planName: z.string(),
  userEmail: z.string().email(),
});

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const message = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  return expectedSignature === signature;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, userEmail } =
      webhookSchema.parse(body);

    // Verify Razorpay signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
      });
    }

    // TODO: Save payment to database (Prisma)
    // TODO: Update user subscription
    // TODO: Send confirmation email

    console.log(`✅ Payment verified for ${userEmail} - Plan: ${planName}`);

    return new Response(
      JSON.stringify({ success: true, message: "Payment verified" }),
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
