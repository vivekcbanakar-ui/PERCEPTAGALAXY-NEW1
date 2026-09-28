import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

// NextAuth required tables
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// Percepta Galaxy specific tables
export const competitors = pgTable("competitor", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  addedAt: timestamp("addedAt").notNull().defaultNow(),
});

export const leads = pgTable("lead", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  source: text("source"),
  competitor: text("competitor"),
  message: text("message"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const subscriptions = pgTable("subscription", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: varchar("plan", { length: 32 }).notNull(), // starter | growth | scale
  status: varchar("status", { length: 32 }).notNull().default("active"), // active | cancelled | expired
  razorpaySubscriptionId: text("razorpaySubscriptionId"),
  razorpayCustomerId: text("razorpayCustomerId"),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Snapshots of competitor pages over time (for change detection)
export const snapshots = pgTable("snapshot", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  competitorId: text("competitorId")
    .notNull()
    .references(() => competitors.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  title: text("title"),
  contentHash: text("contentHash").notNull(),
  contentLength: integer("contentLength").notNull(),
  contentExcerpt: text("contentExcerpt"), // First 5K chars for diff viewing
  fetchedAt: timestamp("fetchedAt").notNull().defaultNow(),
});

// AI-generated insights about competitor changes
export const insights = pgTable("insight", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  competitorId: text("competitorId")
    .notNull()
    .references(() => competitors.id, { onDelete: "cascade" }),
  snapshotId: text("snapshotId")
    .notNull()
    .references(() => snapshots.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 32 }).notNull(), // pricing | feature | content | design | other
  severity: varchar("severity", { length: 16 }).notNull().default("medium"), // low | medium | high
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  rawDiff: text("rawDiff"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Affiliate / Referral tracking
export const referrals = pgTable("referral", {
  id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  code: varchar("code", { length: 32 }).notNull().unique(),
  referrerUserId: text("referrerUserId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  referredUserId: text("referredUserId").references(() => users.id, { onDelete: "set null" }),
  referredEmail: text("referredEmail"),
  status: varchar("status", { length: 32 }).notNull().default("pending"), // pending | converted | paid
  rewardAmount: integer("rewardAmount").default(0), // in cents USD
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  convertedAt: timestamp("convertedAt"),
});
