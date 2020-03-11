const command = require("./command")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("command", command);

app.listen(PORT, (req, res) => {
    console.log(`Server Listening on Port ${PORT}`)
});


