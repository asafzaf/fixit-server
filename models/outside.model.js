const { Schema, model } = require('mongoose');

const outSideSchema = new Schema({

    outsideName: {
        type: String,
        required: true,
    },
    outsideNameHeb: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    spaces: {
        type: [Object],
    }
});

module.exports = model('outSide', outSideSchema);
