import { db } from '@/config/database';

import { isValidLink } from '@/helpers/isvalidLink';
import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { ContentInsert, contentTable } from '../models/contentModel';
import { getEmbbedings } from '@/helpers/getEmbeddings';

export async function addContent(req: Request, res: Response): Promise<void> {
  try {
    const content: ContentInsert = {
      title: req.body.title,
      typeOfContent: req.body.typeOfContent,
      link: req.body.link,
      description: req.body.description,
      isPublic: req.body.isPublic,
      userId: req.userId,
    };
    const validLink = isValidLink(content.link);
    if (!validLink) {
      res.status(400).json({
        message: 'Invalid Link',
        error: 'Invalid Link',
      });
    }
    const insertedRow = await db
      .insert(contentTable)
      .values(content)
      .returning();

    res.status(200).json({
      message: 'Data Inserted Successfully',
    });
    const loader = YoutubeLoader.createFromUrl(content.link, {
      language: 'es',
      addVideoInfo: true,
    });

    const docs = await loader.load();

    const embbedings = await getEmbbedings(docs[0].pageContent);
    await db
      .update(contentTable)
      .set({
        title: content.title,
      })
      .where(eq(contentTable.id, insertedRow[0].id));
  } catch (err) {
    console.error('Error inserting Content:', err);
    res.json({
      message: 'Error inserting Content',
      error: err,
    });
  }
}
export async function getContent(req: Request, res: Response) {
  try {
    const content = await db
      .select()
      .from(contentTable)
      .where(eq(contentTable.userId, req.userId))
      .execute();

    res.status(200).json({
      message: 'Data Fetched Successfully',
      data: content,
    });
  } catch (err) {
    console.error('Error fetching Content:', err);
    res.status(500).json({
      message: 'Error fetching Content',
      error: err,
    });
  }
}
