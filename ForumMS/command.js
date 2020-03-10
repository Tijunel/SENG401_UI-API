const express = require("express");
const router = express.Router();


app.post("/forum", (req, res) => {
    console.log("In the forum command");
});

app.post("/topic", (req, res) => {
    console.log("In the topic command");
});

app.post("/comment", (req, res) => {
    console.log("In the comment command");
});

module.exports = router;