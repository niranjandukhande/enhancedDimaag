import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./userModel";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
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
const insertSchema = createInsertSchema(contentTable, {
  createdAt: (schema) => schema.optional(),
  id: (schema) => schema.optional(),
  updatedAt: (schema) => schema.optional(),
  
});

export type ContentInsert = z.infer<typeof insertSchema>;
