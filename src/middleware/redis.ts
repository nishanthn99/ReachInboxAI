import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Redis({
  port: Number(process.env.redis_port),
  host: process.env.redis_host,
  password: process.env.redis_pass,
}, {
  maxRetriesPerRequest: null,
});

// Function to get token from Redis based on email
export const redisGetToken = async (email: string): Promise<string | null> => {
  try {
    const token = await connection.get(email);
    return token;
  } catch (error) {
    console.error(`Error retrieving token from Redis for email ${email}:`, error.message);
    throw new Error(`Error retrieving token from Redis for email ${email}.`);
  }
};

export { connection };
