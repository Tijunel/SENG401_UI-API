const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const forum = require("./routes/forum");
const feedback = require("./routes/feedback");
const InitiateMongoServer = require("./config/db")

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

app.use("/user", user);

app.use("/forum", forum);

app.use("/feedback", feedback);

app.listen(PORT, (req, res) => {
    console.log(`Server Listening on Port ${PORT}`)
});

