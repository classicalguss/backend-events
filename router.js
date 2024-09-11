const express = require('express');
const router = express.Router();
const Event = require('./models/events');
// const Event = require('./models/Event');  // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load your public key (ensure you have it in PEM format)
const publicKey = fs.readFileSync('public-key.pem', 'utf8');

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
        // Create a new event using the request body
        const newEvent = new Event({
            name: req.body.name,
            details: req.body.details,
            user_id: decoded?.aud,
            x_client_id: req.headers['x-client-id']
        });

        // Save the event to MongoDB
        const savedEvent = await newEvent.save();

        // Send the saved event as a response
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message || error });
    }
});

module.exports = router;