const express = require('express');
const router = express.Router();
const Event = require('./models/events');
// const Event = require('./models/Event');  // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load your public key (ensure you have it in PEM format)
const publicKey = fs.readFileSync('public-key.pem', 'utf8');
const extraInfoCollector = require('./helpers/extraInfoCollector');

// Define routes
router.get('/', (req, res) => {
    res.send('Use post please');
});

router.get('/:id', (req, res) => {
    res.send(`Event ID: ${req.params.id}`);
});

let decoded;
router.use(function(req, res, next) {
    try {
        // Verify the token using RS256 algorithm
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ error: 'Unauthorized..' });
    }
    next();
});
router.post('/', async (req, res) => {
    try {
        let payload = {
            name: req.body.name,
            x_client_id: req.headers['x-client-id'],
            user_id: decoded?.aud,
            user: decoded?.user,
            details: req.body.details
        }

        if (!payload.details) {
            payload = mergePayload(payload);
        }
        payload = await extraInfoCollector(payload, req);
        // Create a new event using the request body
        const newEvent = new Event(payload);

        // Save the event to MongoDB
        const savedEvent = await newEvent.save();

        // Send the saved event as a response
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating event', error: error.message || error });
    }
});

function mergePayload(payload) {
    const { action, user_id, x_client_id, ...details } = payload;
    return { action, user_id, x_client_id, details };
}

module.exports = router;