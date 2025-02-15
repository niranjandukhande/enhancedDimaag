import { Request, Response } from "express";
import { db } from "../config/database";
import { contentTable } from "../models/contentModel";
import { eq } from "drizzle-orm";

export async function addContent(req: Request, res: Response) {
  console.log("req.body", req.body);

  try {
    const content = {
      title: req.body.title,
      typeOfContent: req.body.typeOfContent,
      link: req.body.link,
      description: req.body.description,
      isPublic: req.body.isPublic,
      userId: req.userId,
    };

    const insertedContent = await db
      .insert(contentTable)
      .values(content)
      .returning();
    console.log("Content Inserted:", insertedContent);
    res.status(200).json({
      message: "Data Inserted Successfully",
    });
  } catch (err) {
    console.error("Error inserting Content:", err);
    res.json({
      message: "Error inserting Content",
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
    console.log("Content", content);
    res.status(200).json({
      message: "Data Fetched Successfully",
      data: content,
    });
  } catch (err) {
    console.error("Error fetching Content:", err);
    res.json({
      message: "Error fetching Content",
      error: err,
    });
  }
}
