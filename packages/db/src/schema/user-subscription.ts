import * as t from "drizzle-orm/pg-core";

import { user } from "./auth";
import { serviceProviders } from "./service-providers";
import { subscriptionPlans } from "./subscription-plans";

export const userSubscriptions = t.pgTable("user_subscriptions", {
  id: t.uuid("subscription_id").primaryKey().defaultRandom(),
  userId: t.text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  providerId: t.uuid("provider_id")
    .references(() => serviceProviders.id, { onDelete: "set null" }),
  planId: t.uuid("plan_id")
    .references(() => subscriptionPlans.id, { onDelete: "set null" }),

  name: t.varchar("name", { length: 255 }).notNull(),
  price: t.numeric('price', { precision: 10, scale: 2 }),
  currency: t.varchar('currency', { length: 3 }).notNull().default('USD'),

  billingCycle: t.varchar("billing_cycle", { length: 20 }).notNull(),

  firstPaymentDate: t.date("first_payment_date").notNull(),
  nextBillingDate: t.date("next_billing_date").notNull(),

  status: t.varchar("status", { length: 20 }).default('ACTIVE').notNull(),
  autoRenew: t.boolean("auto_renew").default(true),

  paymentMethod: t.varchar("payment_method", { length: 50 }), // 'credit_card', 'paypal'

  startDate: t.date('start_date').notNull(),
  endDate: t.date("end_date"), // NULL si sigue activa
  cancelledAt: t.timestamp('cancelled_at', { withTimezone: true }),

  notes: t.text("notes"),
  reminderEnabled: t.boolean("reminder_enabled").default(true),
  reminderDaysBefore: t.integer("reminder_days_before").default(2),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
});
