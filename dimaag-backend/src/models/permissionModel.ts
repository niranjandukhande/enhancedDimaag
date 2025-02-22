import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from '@/models/userModel';
import { contentTable } from '@/models/contentModel';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const permissionTable = pgTable('permissions', {
  id: uuid().primaryKey().defaultRandom(),
  contentId: uuid()
    .notNull()
    .references(() => contentTable.id),
  owner: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  sharesWith: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.clerkId, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const insertSchema = createInsertSchema(permissionTable, {
  createdAt: (schema) => schema.optional(),
  id: (schema) => schema.optional(),
  updatedAt: (schema) => schema.optional(),
});

export type PermissionInsert = z.infer<typeof insertSchema>;
