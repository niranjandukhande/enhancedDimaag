import { app } from '@/app';
import { db } from '@/config/database';
import { syncWithClerk } from '@/config/syncWithClerk';
import { searchContent } from './controllers/contentController';

const PORT = 3000;

(async () => {
  try {
    // await searchContent(
    //   'what is garbage collector',
    //   'user_2t4imqshnbvLRcDNL3yHOH6HliG',
    // );
    await db.execute('select 1');
    console.log('Connected to the database');
    await syncWithClerk();
    console.log('Synced with Clerk SUCCESSFUL');
  } catch (error) {
    console.error(
      'Error connecting to the database or syncing with Clerk:',
      error,
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
