const redis = require('redis');
require('dotenv').config(); // Load environment variables

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_STRING}:6379`
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.connect(); // ✅ Connect to Redis

module.exports = redisClient; // ✅ CommonJS export