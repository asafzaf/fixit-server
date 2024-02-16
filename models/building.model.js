const { Schema, model } = require("mongoose");

const buildingSchema = new Schema({
    buildingName: {
        type: String,
        required: true,
    },
    buildingID: {
        type: String,
        required: true,
    },
    floors: {
        type: [Object],
        required: true,
    },
});

module.exports = model("building", buildingSchema);
