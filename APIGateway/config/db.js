"use strict";
const mongoose = require("mongoose");
const MONGOURI = "mongodb+srv://gateway:Ygz6pAwqBZC806XpM3WI@users-4o9qq.mongodb.net/SENG401User?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB!");
    } catch (e) {
        console.log("Error connecting to MongoDB!");
    }
}

module.exports = InitiateMongoServer;