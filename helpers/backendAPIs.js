const redisClient = require('./redisClient');
const axios = require("axios");

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

async function getZoneById(id, req) {
    const cacheKey = `zone:${id}`;

    try {
        // Check Redis first
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Fetch from API if not found in Redis
        const axios = require('axios');
        const response = await axios.get(`${process.env.BACKEND_DOMAIN}/api/v1/zones/${id}`,{
            headers: {
                "Authorization": req.get('authorization')
            }
        });
        const zoneData = response.data.data;

        // Store in Redis with expiration (1 hour)
        await redisClient.set(cacheKey, JSON.stringify(zoneData), { EX: 10400 });

        return zoneData;
    } catch (error) {
        console.error("Error fetching zone data:", error.message);
        // throw error;
    }
}

async function getBoothId(id, req) {
    const cacheKey = `booth:${id}`;

    try {
        // Check Redis first
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Fetch from API if not found in Redis
        const axios = require('axios');
        const response = await axios.get(`${process.env.BACKEND_DOMAIN}/api/v1/booths/${id}`,{
            headers: {
                "Authorization": req.get('authorization')
            }
        });
        const boothData = response.data.data;
        delete boothData.features;

        // Store in Redis with expiration (1 hour)
        await redisClient.set(cacheKey, JSON.stringify(boothData), { EX: 10400 });

        return boothData;
    } catch (error) {
        console.error("Error fetching zone data:", error.message);
        // throw error;
    }
}

async function getRentContractById(id, req) {
    const cacheKey = `rentContract2:${id}`;

    try {
        // Check Redis first
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Fetch from API if not found in Redis
        const axios = require('axios');
        const response = await axios.get(`${process.env.BACKEND_DOMAIN}/api/v1/rent-contracts/${id}`,{
            headers: {
                "Authorization": req.get('authorization')
            }
        });
        const rentContractData = response.data.data;

        // Store in Redis with expiration (1 hour)
        await redisClient.set(cacheKey, JSON.stringify(rentContractData), { EX: 10400 });

        return rentContractData;
    } catch (error) {
        console.error("Error fetching zone data:", error.message);
        // throw error;
    }
}

module.exports = { getFloorById, getZoneById, getBoothId, getRentContractById };