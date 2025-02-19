import { generateRandomUsername } from '@/helpers/generateRandomUsername';
import { usersTable } from '@/models/userModel';
import { Webhook } from 'svix';

import { db } from '@/config/database';
import { Request, Response } from 'express';

export async function userWebhook(req: Request, res: Response) {
  console.log('webhook called');
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.warn(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env',
    );
    return void res.json({
      success: false,
      message: 'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env',
    });
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers['svix-id'];
  const svix_timestamp = headers['svix-timestamp'];
  const svix_signature = headers['svix-signature'];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: 'Error: Missing svix headers',
    });
  }

  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id as string,
      'svix-timestamp': svix_timestamp as string,
      'svix-signature': svix_signature as string,
    });
  } catch (err: any) {
    console.warn('Error: Could not verify webhook:', err.message);
    return void res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  const userDetails = {
    username: generateRandomUsername(),
    clerkId: evt.data.id,
    bio: '',
    imageUrl: evt.data.image_url,
    email: evt.data.email_addresses[0].email_address,
  };

  try {
    const insertedUser = await db
      .insert(usersTable)
      .values(userDetails)
      .returning();
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err; // Ensure error is handled properly
  }

  return void res.status(200).json({
    success: true,
    message: 'Webhook received',
  });
}
