import { index, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const order = pgTable("order", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index('order_status_idx').on(table.status),
]);