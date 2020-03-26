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

router.post("/submitFeedback", async (req, res) => {
  try {
    var companyID = req.body.companyID;
    var forumID = req.body.forumID;
    var forumName = req.body.forumName;
    var message = req.body.message;

    var forumRef = firebase
      .database()
      .ref("feedback")
      .child("companies")
      .child(companyID)
      .child(forumID)
    var messageRef = forumRef.child("messages")
    messageRef.push(message)
    var nameRef = forumRef.child("name")
    nameRef.set(forumName)
    res.sendStatus(200)
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});

router.post("/getFeedback", async (req, res) => {
  try {
    var companyID = req.body.companyID;
    var companyRef = firebase
      .database()
      .ref("feedback")
      .child("companies")
      .child(companyID)

    var allMessages = []
    await companyRef.once('value').then(snapshot => {
      var i = 0;
      snapshot.forEach((child) => {
        let forumName = child.val().name
        allMessages.push({forumName: forumName, messages: []}) 
        var messages = child.val().messages
        for (message in messages) {
          allMessages[i].messages.push(messages[message])
        }
        i++;
      });
    });
    res.json(allMessages)
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});

module.exports = router;
