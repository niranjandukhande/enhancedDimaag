import { Request, Response } from 'express';
import { db } from '@/config/database';
import { usersTable } from '@/models/userModel';
import { eq, ne } from 'drizzle-orm';
import { isVerifiedWithClerk } from '@/helpers/isVerifiedWithClerk';

export async function getUserDetails(req: Request, res: Response) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, req.userId));

    res.status(200).json(user[0]);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: 'Error retrieving user details' });
  }
}
export async function getAllUsers(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let userId;

    const isVerified = token ? await isVerifiedWithClerk(token) : null;

    if (isVerified) {
      userId = isVerified.sub;
    }

    if (userId) {
      const response = await db
        .select()
        .from(usersTable)
        .where(ne(usersTable.clerkId, userId))
        .execute();
      res.status(200).json({
        data: response,
      });
    } else {
      const response = await db.select().from(usersTable).execute();
      res.status(200).json({
        data: response,
      });
    }
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res
      .status(500)
      .json({ message: 'Error retrieving user details', error: error });
  }
}
