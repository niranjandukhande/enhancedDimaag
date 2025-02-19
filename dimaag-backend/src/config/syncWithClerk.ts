import { clerkClient } from '@clerk/express';
import { generateRandomUsername } from '@/helpers/generateRandomUsername';
import { usersTable } from '@/models/userModel';
import { db } from '@/config/database';
import { BATCH_SIZE_SYNC_USERS } from '@/constant';
import { SyncStats } from '@/types/syncStatsType';

export async function syncWithClerk() {
  const stats: SyncStats = {
    processed: 0,
    failed: 0,
    created: 0,
    updated: 0,
    errors: [],
  };
  try {
    let offset = 0;
    let hasMore = true;
    while (hasMore) {
      const clerkUsers = await clerkClient.users.getUserList({
        limit: BATCH_SIZE_SYNC_USERS,
        offset: offset,
      });
      if (clerkUsers.data.length < BATCH_SIZE_SYNC_USERS) {
        hasMore = false;
      }
      for (const user of clerkUsers.data) {
        if (!user.emailAddresses[0].emailAddress) {
          throw new Error(
            'Email address not found for user : ' + user.firstName ||
              user.fullName ||
              '',
          );
        }
        const userDetails = {
          username: generateRandomUsername(),
          clerkId: user.id,
          bio: '',
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        };
        const responseFromInsert = await db
          .insert(usersTable)
          .values(userDetails)
          .onConflictDoNothing({
            target: usersTable.clerkId,
          })
          .execute();
        if (responseFromInsert.rows.length > 0) {
          stats.created++;
          console.log('User created:', responseFromInsert.rows[0]);
        }
        stats.processed++;
      }
      offset += BATCH_SIZE_SYNC_USERS;
      console.log('Processed A batch  OFFSET:', offset);
    }
  } catch (error) {
    stats.failed++;
    console.error('Error syncing with Clerk:', error);
    stats.errors.push({
      error: `Batch processing error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      timestamp: new Date(),
    });
  } finally {
    console.log('Syncing with Clerk complete:', stats);
  }
}
