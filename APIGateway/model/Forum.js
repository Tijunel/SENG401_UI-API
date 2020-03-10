const mongoose = require("mongoose");

const ForumSchema = mongoose.Schema({
    accessCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("forum", ForumSchema);