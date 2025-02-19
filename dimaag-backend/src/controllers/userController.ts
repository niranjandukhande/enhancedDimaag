import { Request, Response } from "express";
import { db } from "../config/database";
import { usersTable } from "../models/userModel";
import { eq } from "drizzle-orm";

export async function getUserDetails(req: Request, res: Response) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, req.userId));

    res.status(200).json(user);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "Error retrieving user details" });
  }
}
