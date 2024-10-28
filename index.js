const express = require('express')
const app = express()
const port = 3000
const eventsRouter = require('./router');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('public-key.pem', 'utf8');
require('dotenv').config()

const mongoose = require('mongoose');

// Connect to MongoDB (Replace with your MongoDB connection string)
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/businesspark`, {
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use(express.json()) // for parsing application/json

app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})