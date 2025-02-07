import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./userModel";
import { contentTable } from "./contentModel";

export const permissionTable = pgTable("permissions", {
  id: uuid().primaryKey().defaultRandom(),
  contentId: uuid()
    .notNull()
    .references(() => contentTable.id),
  owner: uuid()
    .notNull()
    .references(() => usersTable.id),
  sharesWith: uuid()
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
