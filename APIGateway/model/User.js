const mongoose = require("mongoose");
const Forum = require("./Forum")
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    forums: [
        Forum.schema
    ]
})

module.exports = mongoose.model("user", UserSchema);