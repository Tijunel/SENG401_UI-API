const express = require("express");
const bodyParser = require("body-parser");
const feedback = require("./feedback");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/feedback", feedback);

app.listen(PORT, (req, res) => {
  console.log(`Server Listening on Port ${PORT}`);
});
