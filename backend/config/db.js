require('dotenv').config();
const mysql = require('mysql2');
const redis = require('redis');

// Debugging logs to check environment variables
console.log("ENV - REDIS_URL:", process.env.REDIS_URL);

// Ensure the REDIS_URL is correctly formatted
let redisUrl = process.env.REDIS_URL;
if (!redisUrl.startsWith('redis://')) {
  redisUrl = `redis://${redisUrl}`;
}

console.log("Connecting to Redis at:", redisUrl);

// MySQL Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Redis Configuration
const redisClient = redis.createClient({ url: redisUrl });

redisClient.on('connect', () => {
  console.log('Connected to Redis.');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis client is ready.');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
})();

module.exports = { db, redisClient };
