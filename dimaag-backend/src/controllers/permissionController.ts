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
  //this username used to get content of this username
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

      const contentArray = await db
        .select()
        .from(contentTable)
        .where(
          inArray(
            contentTable.id,
            contentIds.map((id) => id.id),
          ),
        )
        .execute();

      res.status(200).json({ data: [...publicContent, contentArray] });
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
