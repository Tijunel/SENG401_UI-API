var firebase = require("firebase/app");
var firebaseDatabase = require("firebase/database");
const express = require("express");
const router = express.Router();
const config = {
  apiKey: "AIzaSyB_4QWyx3NWR00xtwofQ8shIeIU6noLVFw",
  authDomain: "aonfeedback.firebaseapp.com/",
  databaseURL: "https://aonfeedback.firebaseio.com"
};

firebase.initializeApp(config);

router.get("/test", async (req, res) => {
  try {
    var firstInListRef = firebase
      .database()
      .ref("feedback/")
      .limitToFirst(1);
    firstInListRef.on("value", function(data) {
      res.json(data);
    });
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});

module.exports = router;
