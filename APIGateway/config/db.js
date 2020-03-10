const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://gateway:Ygz6pAwqBZC806XpM3WI@users-4o9qq.mongodb.net/SENG401User?retryWrites=true&w=majority"

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, { useNewUrlParser: true });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = InitiateMongoServer;