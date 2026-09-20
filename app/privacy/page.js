"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="max-w-3xl mx-auto bg-slate-900/60 border border-purple-500/20 rounded-lg p-8 backdrop-blur-sm text-slate-200">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: September 20, 2026</p>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Account information</strong>: name, email, profile picture (from Google or
              GitHub)
            </li>
            <li>
              <strong>Usage data</strong>: features used, competitors monitored, frequency of use
            </li>
            <li>
              <strong>Payment information</strong>: processed by Razorpay; we never see card details
            </li>
            <li>
              <strong>Technical data</strong>: IP address, browser type, device info (for security)
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>To provide and improve the Service</li>
            <li>To process payments and prevent fraud</li>
            <li>To send service updates and (with consent) marketing emails</li>
            <li>To respond to support requests</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          We do NOT sell your data. We share data only with:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Razorpay</strong> — payment processing
            </li>
            <li>
              <strong>Vercel</strong> — hosting (data may be stored in multiple regions)
            </li>
            <li>
              <strong>Google / GitHub</strong> — authentication providers
            </li>
            <li>
              <strong>Law enforcement</strong> — only when legally required
            </li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          We use essential cookies for authentication. No third-party tracking cookies without
          consent.
        </Section>

        <Section title="5. Data Security">
          We use industry-standard encryption (HTTPS/TLS), secure authentication via NextAuth.js,
          and payment data is handled entirely by Razorpay (PCI-DSS compliant). However, no
          system is 100% secure.
        </Section>

        <Section title="6. Data Retention">
          We retain your account data while your account is active. If you delete your account, we
          delete personal data within 30 days (except data we must legally retain).
        </Section>

        <Section title="7. Your Rights (GDPR / India DPDP Act)">
          You have the right to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Object to processing</li>
          </ul>
          Email <a href="mailto:privacy@perceptagalaxy.com" className="text-purple-400 hover:underline">privacy@perceptagalaxy.com</a> to exercise these rights.
        </Section>

        <Section title="8. Children's Privacy">
          The Service is not intended for users under 18. We do not knowingly collect data from
          minors.
        </Section>

        <Section title="9. International Transfers">
          Your data may be transferred to and processed in countries other than your own. We rely
          on standard contractual clauses and provider safeguards (Vercel, Razorpay) for such
          transfers.
        </Section>

        <Section title="10. Changes to This Policy">
          We may update this Privacy Policy. Material changes will be notified via email or in-app
          notice.
        </Section>

        <Section title="11. Contact">
          For privacy questions or to exercise your rights:
          <br />
          <a href="mailto:privacy@perceptagalaxy.com" className="text-purple-400 hover:underline">
            privacy@perceptagalaxy.com
          </a>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

export const metadata = {
  title: "Privacy Policy",
  description: "Percepta Galaxy Privacy Policy - how we handle your data",
};
