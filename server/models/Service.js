const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String } // URL or path
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);