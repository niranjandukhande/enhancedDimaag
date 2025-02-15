import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./userModel";
import { contentTable } from "./contentModel";

export const permissionTable = pgTable("permissions", {
  id: uuid().primaryKey().defaultRandom(),
  contentId: uuid()
    .notNull()
    .references(() => contentTable.id),
  owner: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  sharesWith: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
