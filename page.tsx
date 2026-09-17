'use client';

import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('pro');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout-razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, planTier: plan }),
      });

      const data = await response.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        handler: function (response: any) {
          alert('Payment successful! Trial activated.');
          window.location.reload();
        },
        prefill: {
          email: email,
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Percepta Galaxy</h1>
        <p className="text-gray-300 mb-8">Track competitors in real-time. AI-powered insights.</p>
        
        <div className="bg-gray-900 p-8 rounded-lg border border-purple-500">
          <div className="mb-4">
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 text-sm">Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 mt-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
            >
              <option value="starting">Starting - ₹4,900/month</option>
              <option value="pro">Pro - ₹12,000/month</option>
              <option value="max">Max - ₹16,000/month</option>
              <option value="custom">Custom - ₹33,000/month</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || !email}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 rounded transition"
          >
            {loading ? 'Processing...' : 'Start Free Trial'}
          </button>

          <p className="text-gray-400 text-xs mt-4 text-center">
            14-day free trial. No credit card required initially.
          </p>
        </div>
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
