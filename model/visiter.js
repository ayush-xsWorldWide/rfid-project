const mongoose = require('mongoose');

const visiter = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    cardno: {
        type: String,
        unique: true,
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