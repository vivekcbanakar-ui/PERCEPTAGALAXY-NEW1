import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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

// Email login via Resend is disabled until a database is configured.
// NextAuth's email provider requires a DB to store verification tokens.
// When you add a database (Supabase, Vercel Postgres, etc.), we'll wire this back up.

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
