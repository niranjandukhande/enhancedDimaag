import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./userModel";

export const contentTable = pgTable("contents", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  typeOfContent: varchar({ length: 255 }).notNull(),
  description: text(),
  link: varchar({ length: 255 }).notNull(),
  isPublic: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
