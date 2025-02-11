import { eq } from "drizzle-orm";
import { db } from "../config/database";
import { contentTable } from "../models/contentModel";
import { usersTable } from "../models/userModel";

// const contentDetails = {
//     title: formData.title,
//     typeOfContent: formData.platform,
//     description: formData.description,
//     isPublic: !formData.isPrivate,
//     userId: userId,
//   }

export async function addContent(req:any,res:any){

    const user = await db
      .select({ id: usersTable.id }) // Select only the id
      .from(usersTable)
      .where(eq(usersTable.clerkId, req.body.userId))
      .limit(1);

    if (!user.length) {
      throw new Error("User not found for the provided clerkId");
    }

    const userId = user[0].id; // Get the UUID

    const contentDetails = {
        title: req.body.title,
        typeOfContent: req.body.typeOfContent,
        description: req.body.description,
        isPublic: req.body.isPublic,
        userId: userId
    }

    try {
            const insertedContent = await db.insert(contentTable).values(contentDetails).returning();
            console.log("Content Inserted:", insertedContent);
        } catch (err) {
            console.error("Error inserting Content:", err);
            throw err; // Ensure error is handled properly
        }

        res.status(200).json({
            message: "Data Inserted Successfully"
        })

}