const mongoose = require('mongoose');

const events = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email:{
        type: String
    },
    place: {
        type: String
    },
    noexp:{
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("events", events);