import { Webhook } from "svix";
import { generateRandomUsername } from "../helpers/generateRandomUsername";
import { userInsertSchema, usersTable } from "../models/userModel";
import { db } from "../config/database";

export async function userWebhook(req:any,res:any){
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body

    console.log(headers)
    console.log(headers["svix-id"])
    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return void res.status(400).json({
        success: false,
        message: 'Error: Missing svix headers',
      })
    }

    let evt:any

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id as string,
        'svix-timestamp': svix_timestamp as string,
        'svix-signature': svix_signature as string,
      })
    } catch (err:any) {
      console.log('Error: Could not verify webhook:', err.message)
      return void res.status(400).json({
        success: false,
        message: err.message,
      })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)

    const userDetails = {
        username: generateRandomUsername(),
        clerkId: evt.data.id,
        bio: "",
        imageUrl: evt.data.image_url,
        email: evt.data.email_addresses[0].email_address
    }

    console.log("User Details : ",userDetails)

    try {
        const insertedUser = await db.insert(usersTable).values(userDetails).returning();
        console.log("Data Inserted:", insertedUser);
    } catch (err) {
        console.error("Error inserting user:", err);
        throw err; // Ensure error is handled properly
    }



    return void res.status(200).json({
      success: true,
      message: 'Webhook received',
    })
    }