const express = require('express');
const router = express.Router();
const { db, redisClient } = require('../config/db');

// Cache key for messages
const MESSAGE_CACHE_KEY = 'messages';

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    // Check Redis cache
    const cachedMessages = await redisClient.get(MESSAGE_CACHE_KEY);
    if (cachedMessages) {
      console.log('Serving from Redis cache');
      return res.json(JSON.parse(cachedMessages));
    }

    // Fetch from database if not in cache
    db.query('SELECT * FROM messages', async (err, results) => {
      if (err) throw err;

      // Store in Redis with a TTL of 60 seconds
      await redisClient.set(MESSAGE_CACHE_KEY, JSON.stringify(results), { EX: 60 });

      console.log('Serving from MySQL database');
      res.json(results);
    });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Server error');
  }
});

// Add a new message
router.post('/messages', async (req, res) => {
  const { content } = req.body;
  db.query('INSERT INTO messages (content) VALUES (?)', [content], async (err, result) => {
    if (err) throw err;

    // Invalidate the cache after a new message is added
    await redisClient.del(MESSAGE_CACHE_KEY);

    res.json({ id: result.insertId, content });
  });
});

// Update a message
router.put('/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  db.query('UPDATE messages SET content = ? WHERE id = ?', [content, id], async (err) => {
    if (err) throw err;

    // Invalidate the cache after a message is updated
    await redisClient.del(MESSAGE_CACHE_KEY);

    res.sendStatus(200);
  });
});

// Delete a message
router.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM messages WHERE id = ?', [id], async (err) => {
    if (err) throw err;

    // Invalidate the cache after a message is deleted
    await redisClient.del(MESSAGE_CACHE_KEY);

    res.sendStatus(200);
  });
});

module.exports = router;
