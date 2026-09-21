"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const PLANS = {
  starter: { name: "Starter", price: 99, maxCompetitors: 1 },
  growth: { name: "Growth", price: 399, maxCompetitors: 3 },
  scale: { name: "Scale", price: 999, maxCompetitors: 10 },
};

function CheckoutInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const planName = searchParams.get("plan") || "growth";
  const plan = PLANS[planName] || PLANS.growth;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Step 1: Create Razorpay order
      const checkoutRes = await fetch("/api/checkout-razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          email: session.user?.email,
        }),
      });

      if (!checkoutRes.ok) {
        throw new Error("Failed to create payment order");
      }

      const { orderId, razorpayKeyId } = await checkoutRes.json();

      // Step 2: Open Razorpay payment modal
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: razorpayKeyId,
          order_id: orderId,
          amount: plan.price * 100, // USD cents
          currency: "USD",
          name: "Percepta Galaxy",
          description: `${plan.name} Plan - ${plan.maxCompetitors} competitors`,
          prefill: {
            email: session.user?.email,
          },
          handler: async function (response) {
            try {
              // Verify payment on backend
              const verifyRes = await fetch("/api/webhooks/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  planName,
                  userEmail: session.user?.email,
                }),
              });

              if (verifyRes.ok) {
                alert("✅ Payment successful! Welcome to Percepta Galaxy Pro!");
                router.push("/dashboard");
              } else {
                setError("Payment verification failed. Please contact support.");
              }
            } catch (err) {
              setError("Payment verification error. Please contact support.");
            }
          },
          theme: {
            color: "#a855f7",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    } catch (err) {
      setError(err.message || "Payment error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </h1>
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Checkout */}
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="bg-purple-900/40 border border-purple-500/30 rounded-lg p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

          {/* Order Summary */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Plan</span>
              <span className="font-bold">{plan.name}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Competitors</span>
              <span className="font-bold">{plan.maxCompetitors}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Free Trial</span>
              <span className="font-bold">14 days</span>
            </div>
            <div className="border-t border-purple-500/20 pt-4 flex justify-between">
              <span className="text-slate-300">Amount Due Today</span>
              <span className="text-xl font-bold">₹0</span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={session.user?.email || ""}
              disabled
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-bold transition mb-4"
          >
            {loading ? "Processing..." : "Start Free Trial"}
          </button>

          <p className="text-center text-xs text-slate-400">
            You won't be charged until your 14-day trial ends.
            <br />
            Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
