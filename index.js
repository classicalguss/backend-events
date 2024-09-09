const express = require('express')
const app = express()
const port = 3000
const eventsRouter = require('./router');

app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})