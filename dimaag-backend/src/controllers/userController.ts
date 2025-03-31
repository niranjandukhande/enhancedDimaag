import { db } from '@/config/database';
import { tryCatch } from '@/helpers/try-catch';
import { usersTable } from '@/models/userModel';
import { eq, ne } from 'drizzle-orm';
import { Request, Response } from 'express';

export async function getUserDetails(req: Request, res: Response) {
  const { data: user, error: userError } = await tryCatch(
    db.select().from(usersTable).where(eq(usersTable.clerkId, req.userId)),
  );
  if (userError) {
    res
      .status(500)
      .json({ message: 'Error retrieving user details', error: userError });
    return;
  }

  res.status(200).json(user[0]);
}
export async function getAllUsers(req: Request, res: Response) {
  try {
    const userId = req.userId;

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

export async function updateUserDetails(req: Request, res: Response) {
  const userId = req.userId;
  const { username, bio } = req.body;
  try {
    const updatedUser = await db
      .update(usersTable)
      .set({ username: username, bio: bio })
      .where(eq(usersTable.clerkId, userId))
      .returning();
    res.status(200).json({
      message: 'success',
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
}
