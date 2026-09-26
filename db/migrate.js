// One-time schema push to Neon.
// In production, replace with proper migrations (drizzle-kit generate + migrate).
// For now, we use the runtime HTTP push on first API call.

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const SCHEMA = `
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text,
  "email" text NOT NULL UNIQUE,
  "emailVerified" timestamp,
  "image" text
);

CREATE TABLE IF NOT EXISTS "account" (
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "provider" text NOT NULL,
  "providerAccountId" text NOT NULL,
  "refresh_token" text,
  "access_token" text,
  "expires_at" integer,
  "token_type" text,
  "scope" text,
  "id_token" text,
  "session_state" text,
  PRIMARY KEY ("provider", "providerAccountId")
);

CREATE TABLE IF NOT EXISTS "session" (
  "sessionToken" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "verificationToken" (
  "identifier" text NOT NULL,
  "token" text NOT NULL,
  "expires" timestamp NOT NULL,
  PRIMARY KEY ("identifier", "token")
);

CREATE TABLE IF NOT EXISTS "competitor" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "url" text NOT NULL,
  "addedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "lead" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL,
  "source" text,
  "competitor" text,
  "message" text,
  "createdAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "subscription" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "plan" varchar(32) NOT NULL,
  "status" varchar(32) NOT NULL DEFAULT 'active',
  "razorpaySubscriptionId" text,
  "razorpayCustomerId" text,
  "currentPeriodStart" timestamp,
  "currentPeriodEnd" timestamp,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);
`;

let initialized = false;

export async function ensureSchema() {
  if (initialized) return;
  try {
    // Split by semicolon and run each statement (Neon HTTP supports single-statement queries)
    const statements = SCHEMA.split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const stmt of statements) {
      try {
        await sql(stmt);
      } catch (err) {
        // Ignore "already exists" errors
        if (!String(err.message).includes("already exists")) {
          console.error("Schema statement error:", err.message);
        }
      }
    }
    initialized = true;
    console.log("Schema initialized");
  } catch (error) {
    console.error("ensureSchema failed:", error);
  }
}
