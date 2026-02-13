import * as t from "drizzle-orm/pg-core";

import { serviceProviders } from "./service-providers";

export const subscriptionPlans = t.pgTable(
  "subscription_plans",
  {
    id: t.uuid("plan_id").primaryKey().defaultRandom(),
    providerId: t
      .uuid("provider_id")
      .notNull()
      .references(() => serviceProviders.id),
    name: t.varchar("plan_name").notNull(),
    slug: t.varchar("plan_slug").notNull(),
    basePrice: t.numeric("base_price", { precision: 10, scale: 2 }).notNull(), // Decimal
    currency: t.varchar("currency", { length: 3 }).default("USD"),
    billingCycle: t.varchar("billing_cycle", { length: 20 }).notNull(),
    description: t.text(),
    features: t.jsonb("features"),
    isActive: t.boolean("is_active").default(true), // Indicates if the plan is currently active

    createdAt: t.timestamp("created_at").defaultNow(),
    updatedAt: t.timestamp("updated_at").defaultNow(),
  },
  (table) => [
    t.unique("unique_provider_id_plan_slug").on(table.providerId, table.slug),
  ],
);
