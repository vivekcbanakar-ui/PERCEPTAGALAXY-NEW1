import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

// Register email provider as a custom provider (not next-auth EmailProvider which requires SMTP).
// This avoids the "server config" error when SMTP env vars aren't set.
if (resend) {
  providers.push({
    id: "email",
    type: "email",
    name: "Email",
    from: process.env.EMAIL_FROM || "Percepta Galaxy <onboarding@resend.dev>",
    maxAge: 24 * 60 * 60, // 24 hours
    options: {},
    async sendVerificationRequest({ identifier, url }) {
      try {
        const { error } = await resend.emails.send({
          from: process.env.EMAIL_FROM || "Percepta Galaxy <onboarding@resend.dev>",
          to: identifier,
          subject: "Sign in to Percepta Galaxy",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
              <h1 style="color: #1f2937; font-size: 24px; margin: 0 0 16px;">Sign in to Percepta Galaxy</h1>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin: 0 0 24px;">
                Click the button below to sign in. This link expires in 24 hours and can only be used once.
              </p>
              <a href="${url}" style="display: inline-block; background: linear-gradient(to right, #9333ea, #ec4899); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Sign in →
              </a>
              <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">
                If you didn't request this email, you can safely ignore it.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Percepta Galaxy — AI Competitive Intelligence
              </p>
            </div>
          `,
        });

        if (error) {
          throw new Error(`Resend error: ${error.message}`);
        }
      } catch (error) {
        throw new Error(`Failed to send verification email: ${error.message}`);
      }
    },
  });
}

export const authOptions = {
  providers,
  callbacks: {
    async session({ session, user }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
