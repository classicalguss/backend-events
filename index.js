const express = require('express')
const app = express()
const port = 3000
const eventsRouter = require('./eventsRouter');

app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})