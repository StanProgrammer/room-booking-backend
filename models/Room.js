const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    features: { type: [String], required: true },
    capacity: { type: Number, required: true },
    available: { type: Boolean, default: true },
    bookings: [{
        date: String,
        slots: [{
            time: [String],
            userId: String
        }]
    }]
});

module.exports = mongoose.model('Room', roomSchema);
