const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

// Define the Event schema
const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: Mixed,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the model based on the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;