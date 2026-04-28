const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    stylist: { type: mongoose.Schema.Types.ObjectId, ref: 'Stylist', required: true },
    date: { type: String, required: true }, // store as YYYY-MM-DD
    timeSlot: { type: String, required: true }, // e.g., "10:00 AM"
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);