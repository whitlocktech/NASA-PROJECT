const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rockets: {
        type: String,
        required: true,
    },
    target: {
        type: String,
    },
    customers:  [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
})

// COnnects the launchesSchema to the launches collection
module.exports = mongoose.model('Launch', launchesSchema)