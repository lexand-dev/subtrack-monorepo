import * as t from "drizzle-orm/pg-core";

export const serviceProviders = t.pgTable("service_providers", {
  id: t.uuid("provider_id").primaryKey().defaultRandom(),
  name: t.varchar("provider_name", { length: 255 }).notNull(),
  slug: t.varchar("provider_slug", { length: 100 }).notNull().unique(),
  icontUrl: t.varchar("icon_url", { length: 500 }),
  category: t.varchar("category", { length: 100 }),
  websiteUrl: t.varchar("website_url", { length: 500 }),
  description: t.text("description"),

  createdAt: t.timestamp("created_at").defaultNow(),
  updatedAt: t.timestamp("updated_at").defaultNow(),
});
