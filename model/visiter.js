const mongoose = require('mongoose');

const visiter = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cardno: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "INACTIVE"
    },
    date:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("visiter", visiter);