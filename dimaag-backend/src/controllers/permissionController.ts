import { db } from '@/config/database';
import { isVerifiedWithClerk } from '@/helpers/isVerifiedWithClerk';
import { contentTable } from '@/models/contentModel';
import { PermissionInsert, permissionTable } from '@/models/permissionModel';
import { usersTable } from '@/models/userModel';
import { error } from 'console';
import { and, eq, inArray } from 'drizzle-orm';
import { Request, Response } from 'express';

export async function getContentWithPermission(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
  const { username } = req.params;

  try {
    const user = await db.query.usersTable
      .findFirst({ where: eq(usersTable.username, username) })
      .execute();

    const { embeddings, ...columnsToSelect } = contentTable;
    const publicContent = await db
      //@ts-ignore
      .select(columnsToSelect)
      .from(contentTable)
      .where(
        and(
          eq(contentTable.userId, user!.clerkId),
          eq(contentTable.isPublic, true),
        ),
      )
      .execute();

    if (!token) {
      res.status(200).json({ data: publicContent });
    }
    const isVerified = await isVerifiedWithClerk(token);
    if (!isVerified) {
      console.warn('token is not verified');
      res.status(200).json({ data: publicContent });
    }
    if (isVerified) {
      const contentIds = await db
        .select()
        .from(permissionTable)
        .where(
          and(
            eq(permissionTable.owner, user!.clerkId),
            eq(permissionTable.sharesWith, isVerified.sub),
          ),
        );
      if (!contentIds) res.status(200).json({ data: publicContent });

      const { embeddings, ...columnsToSelect } = contentTable;
      const contentArray = await db
        //@ts-ignore
        .select(columnsToSelect)
        .from(contentTable)
        .where(
          inArray(
            contentTable.id,
            contentIds.map((curr) => curr.contentId),
          ),
        )
        .execute();
      // console.log('contentArray', contentArray);
      const finalContent = publicContent.concat(contentArray);

      res.status(200).json({ data: finalContent });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function addPermission(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { contentId, sharesWith } = req.body;

    if (!contentId || !sharesWith)
      throw error('missing contentid or shareswith');

    const data: PermissionInsert = {
      contentId: contentId,
      sharesWith: sharesWith,
      owner: userId,
    };

    await db.insert(permissionTable).values(data);
    res.status(200).json({
      message: 'permission updated successfully',
    });
  } catch (error) {
    console.log('error while setting permissions', error);
    res.status(500).json({
      message: 'error while inserting',
      error: error,
    });
  }
}
export async function getSharedWithPeople(req: Request, res: Response) {
  console.log('INSIDE');
  try {
    const userId = req.userId;
    const { id } = req.params;
    const sharedWithMe = await db
      .select()
      .from(permissionTable)
      .where(
        and(
          eq(permissionTable.owner, userId),
          eq(permissionTable.contentId, id),
        ),
      )
      .execute();
    const users = await db
      .select()
      .from(usersTable)
      .where(
        inArray(
          usersTable.clerkId,
          sharedWithMe.map((item) => item.sharesWith),
        ),
      )
      .execute();
    res.status(200).json(users);
  } catch (error) {
    console.error('error while getting shared with people', error);
    res.status(500).json({ message: 'error while getting shared with people' });
  }
}
export async function removePermisson(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { contentId, sharesWith } = req.body;

    await db
      .delete(permissionTable)
      .where(
        and(
          eq(permissionTable.contentId, contentId),
          eq(permissionTable.owner, userId),
          eq(permissionTable.sharesWith, sharesWith),
        ),
      );
    res.status(200).json({
      message: 'permission removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'error while removing permission',
      error: error,
    });
  }
}
