import { user } from "./auth";
import * as t from "drizzle-orm/pg-core";

import { serviceProviders } from "./service-providers";
import { subscriptionPlans } from "./subscription-plans";

// User subscriptions (active and historical)
export const userSubscriptions = t.pgTable("user_subscriptions", {
  id: t.uuid("subscription_id").primaryKey().defaultRandom(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  providerId: t
    .uuid("provider_id")
    .notNull()
    .references(() => serviceProviders.id, { onDelete: "restrict" }),
  planId: t
    .uuid("plan_id")
    .notNull()
    .references(() => subscriptionPlans.id, { onDelete: "set null" }),

  // Billing information
  billingCycle: t.varchar("billing_cycle", { length: 20 }).notNull(), // 'monthly', 'yearly', 'weekly'
  firstPayment: t.date("first_payment_date").notNull(),
  nextBilling: t.date("next_billing_date").notNull(),

  // Subscription status
  isActive: t.boolean("is_active").default(true), // false if cancelled or expired
  autoRenew: t.boolean("auto_renew").default(true), // true if subscription will auto-renew at end of billing cycle

  // Payment method
  paymentMethod: t.varchar("payment_method", { length: 50 }),

  // Dates Tracking
  startDate: t.date("start_date").notNull(),
  endDate: t.date("end_date"), // NULL if ongoing
  cancelledAt: t.timestamp("cancelled_at", { withTimezone: true }),

  // Metadata
  notes: t.text("notes"),
  reminderEnabled: t.boolean("reminder_enabled").default(true),
  reminderDaysBefore: t.integer("reminder_days_before").default(3),

  createdAt: t.timestamp("created_at").defaultNow(),
  updatedAt: t.timestamp("updated_at").defaultNow(),
});
