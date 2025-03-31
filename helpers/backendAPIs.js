const redisClient = require('./redisClient');

async function getFloorById(id, req) {
    const cacheKey = `floor:${id}`;

    try {
        // Check Redis first
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Fetch from API if not found in Redis
        const axios = require('axios');
        const response = await axios.get(`${process.env.BACKEND_DOMAIN}/api/v1/floors/${id}?with=building`,{
            headers: {
                "Authorization": req.get('authorization')
            }
        });
        const floorData = response.data.data;

        // Store in Redis with expiration (1 hour)
        await redisClient.set(cacheKey, JSON.stringify(floorData), { EX: 10400 });

        return floorData;
    } catch (error) {
        console.error("Error fetching floor data:", error.message);
        // throw error;
    }
}

module.exports = { getFloorById };