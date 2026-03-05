import serverlessExpress from '@codegenie/serverless-express';
import { app } from '@/app';
import { db } from '@/config/database';
import { syncWithClerk } from '@/config/syncWithClerk';

let serverlessApp: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
  try {
    await db.execute('select 1');
    await syncWithClerk();
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
  serverlessApp = serverlessExpress({ app });
}

const bootstrapPromise = bootstrap();

export const handler = async (event: any, context: any) => {
  await bootstrapPromise;
  return serverlessApp(event, context);
};
