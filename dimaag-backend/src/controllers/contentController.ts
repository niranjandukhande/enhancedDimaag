import { db } from '@/config/database';

import { getEmbbedings, getEmbedding } from '@/helpers/getEmbeddings';
import { isValidLink } from '@/helpers/isvalidLink';
import { ContentInsert, contentTable } from '@/models/contentModel';
import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube';
import { and, cosineDistance, eq, gt, sql } from 'drizzle-orm';
import { Request, Response } from 'express';

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

    const { embeddings, summary } = await getEmbbedings(docs[0].pageContent);
    await db
      .update(contentTable)
      .set({
        embeddings: embeddings,
        summary: summary,
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
    const { embeddings, ...columnsToSelect } = contentTable;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const PAGE_SIZE = 9;

    const content = await db
      //@ts-ignore
      .select(columnsToSelect)
      .from(contentTable)
      .where(eq(contentTable.userId, req.userId))
      .limit(PAGE_SIZE)
      .offset(page * PAGE_SIZE)
      .execute();

    res.status(200).json({
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
export async function deleteContent(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.userId;
    await db
      .delete(contentTable)
      .where(and(eq(contentTable.id, id), eq(contentTable.userId, userId)));
    res.status(200).json({
      message: 'Content deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      message: 'Error deleting content',
      error: error,
    });
  }
}
export async function searchContent(req: Request, res: Response) {
  const userId = req.userId;
  const { query } = req.body;
  const start = Date.now();
  const queryEmbedding = await getEmbedding(query);

  try {
    const similarities = sql<number>` 1 -(${cosineDistance(contentTable.embeddings, queryEmbedding)})`;

    const similarContent = await db
      .select()
      .from(contentTable)
      .where(and(gt(similarities, 0.3), eq(contentTable.userId, userId)))
      .execute();
    const end = Date.now();

    console.log(`time taken to search content:`, end - start);
    res.status(200).json(similarContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error,
    });
  }
}
