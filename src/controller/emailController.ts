import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { connection } from '../middleware/redis';
import dotenv from 'dotenv';

dotenv.config();

// Create a new BullMQ queue
const sendMailQueue = new Queue('email-queue', { connection });

// Define types for email data
interface EmailData {
  from: string;
  to: string;
  id: string;
}

// Enqueue a job to send the email
const sendEmailToQueue = async ({ from, to, id }: EmailData): Promise<void> => {
  try {
    const job = await sendMailQueue.add(
      'Email to the selected User',
      { from, to, id },
      { removeOnComplete: true }
    );
    console.log(`Email to ${to} has been queued. Job ID: ${job.id}`);
  } catch (error) {
    console.error('Error enqueuing email job:', error.message);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Send a single email via queue
export const sendMailViaQueue = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { from, to } = req.body as EmailData;

    await sendEmailToQueue({ from, to, id });
    return res.send('Mail processing has been queued.');
  } catch (error) {
    console.error('Error in sending mail via queue:', error.message);
    return res.status(500).send('Error in sending mail via queue');
  }
};

// Send multiple emails via queue
export const sendMultipleEmails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { from, to } = req.body as { from: string; to: string | string[] };

    if (Array.isArray(to)) {
      for (const recipient of to) {
        await sendEmailToQueue({ from, to: recipient, id });
      }
    } else {
      await sendEmailToQueue({ from, to, id });
    }

    return res.send('Mail processing has been queued for multiple recipients.');
  } catch (error) {
    console.error('Error in sending multiple emails:', error.message);
    return res.status(500).send('Error in sending multiple emails');
  }
};
