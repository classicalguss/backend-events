const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('Welcome to the Events section');
});

router.get('/:id', (req, res) => {
    res.send(`Event ID: ${req.params.id}`);
});

module.exports = router;