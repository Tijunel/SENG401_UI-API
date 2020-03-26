const command = require("./command");
const query = require("./query");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/command", command);
app.use("/query", query);

//Set up Redis

const createRedisDataInstance = require("./eventHandler")[1];
createRedisDataInstance();

app.listen(PORT, (req, res) => {
    console.log(`Server Listening on Port ${PORT}`)
});
