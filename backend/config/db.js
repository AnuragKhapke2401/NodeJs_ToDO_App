require('dotenv').config();
const mysql = require('mysql2');
const redis = require('redis');

// MySQL Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Redis Configuration
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis.');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

module.exports = { db, redisClient };

