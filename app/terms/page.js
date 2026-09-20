import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Percepta Galaxy Terms of Service - rules for using our platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="max-w-3xl mx-auto bg-slate-900/60 border border-purple-500/20 rounded-lg p-8 backdrop-blur-sm text-slate-200">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: September 20, 2026</p>

        <Section title="1. Acceptance of Terms">
          By accessing or using Percepta Galaxy ("Service"), you agree to be bound by these Terms of
          Service. If you disagree with any part, you may not use the Service.
        </Section>

        <Section title="2. Description of Service">
          Percepta Galaxy provides AI-powered competitive intelligence tools that monitor public
          information about businesses, including pricing, product offerings, and marketing
          activities. The Service is provided on a subscription basis with a 14-day free trial.
        </Section>

        <Section title="3. Account Responsibilities">
          You are responsible for maintaining the security of your account and password. Percepta
          Galaxy cannot and will not be liable for any loss or damage from your failure to comply
          with this security obligation.
        </Section>

        <Section title="4. Acceptable Use">
          You agree NOT to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use the Service to monitor individuals for stalking, harassment, or surveillance</li>
            <li>
              Use the Service in violation of any applicable laws, including data protection laws
            </li>
            <li>Attempt to reverse-engineer, decompile, or hack the Service</li>
            <li>Resell or redistribute the Service without written permission</li>
            <li>Use automated scripts to abuse the platform</li>
          </ul>
        </Section>

        <Section title="5. Subscriptions and Payments">
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Subscriptions are billed monthly in advance via Razorpay</li>
            <li>You can cancel anytime; access continues until the end of your billing period</li>
            <li>Refunds are issued at our sole discretion, typically within 14 days of purchase</li>
            <li>Failed payments may result in service suspension after a 7-day grace period</li>
          </ul>
        </Section>

        <Section title="6. Free Trial">
          New users receive a 14-day free trial. We may require payment method validation. You can
          cancel anytime before the trial ends to avoid charges.
        </Section>

        <Section title="7. Intellectual Property">
          The Service, its design, features, and content are owned by Percepta Galaxy and protected
          by intellectual property laws. You retain ownership of data you input.
        </Section>

        <Section title="8. Termination">
          We may terminate or suspend your account immediately for breach of these Terms. You may
          delete your account at any time from your dashboard.
        </Section>

        <Section title="9. Disclaimer">
          The Service is provided "as is" without warranties of any kind. We do not guarantee the
          accuracy of competitive intelligence data, which depends on publicly available sources.
        </Section>

        <Section title="10. Limitation of Liability">
          To the maximum extent permitted by law, Percepta Galaxy shall not be liable for any
          indirect, incidental, special, or consequential damages arising from your use of the
          Service.
        </Section>

        <Section title="11. Governing Law">
          These Terms are governed by the laws of India. Any disputes shall be subject to the
          exclusive jurisdiction of courts in Bengaluru, Karnataka.
        </Section>

        <Section title="12. Changes">
          We may update these Terms from time to time. Continued use after changes constitutes
          acceptance of the new Terms.
        </Section>

        <Section title="13. Contact">
          Questions about these Terms? Email us at{" "}
          <a href="mailto:legal@perceptagalaxy.com" className="text-purple-400 hover:underline">
            legal@perceptagalaxy.com
          </a>
          .
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
