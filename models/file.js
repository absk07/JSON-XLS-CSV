const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    filename: {
        type: String,
        default: ""
    },
    destination: {
        type: String,
        default: ""
    },
    records: {
        type: Number,
        default: 0
    },
    mimeType: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', FileSchema);