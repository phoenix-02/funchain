const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    previousHash: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;
