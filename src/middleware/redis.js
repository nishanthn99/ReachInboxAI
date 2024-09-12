const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis({
  port: 6379,
  host: process.env.redis_host,
}, {
  maxRetriesPerRequest: null,
});

// Function to get token from Redis based on email
const redisGetToken = async (email) => {
  try {
    const token = await connection.get(email);
    return token;
  } catch (error) {
    console.error(`Error retrieving token from Redis for email ${email}:`, error.message);
    throw new Error(`Error retrieving token from Redis for email ${email}.`);
  }
};

module.exports = {
  connection,
  redisGetToken
};
