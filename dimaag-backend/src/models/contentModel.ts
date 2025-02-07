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
  isPublic: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id),
});
