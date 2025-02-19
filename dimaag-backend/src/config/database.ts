import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);

// config({ path: ".env" }); // or .env.local
// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
