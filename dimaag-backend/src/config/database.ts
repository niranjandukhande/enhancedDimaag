import { contentTable } from '@/models/contentModel';
import { permissionTable } from '@/models/permissionModel';
import { usersTable } from '@/models/userModel';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import 'dotenv/config';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, {
  schema: {
    usersTable,
    contentTable,
    permissionTable,
  },
});
