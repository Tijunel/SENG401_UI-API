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

/*router.get("/test", async (req, res) => {
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

router.get("/test1", async (req, res) => {
  try {
    var feedbackRef = firebase.database().ref("feedback/");
    feedbackRef.update({ userID: "testID" });
    res.send({
      message: "test"
    });
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});*/

/*router.get("/test2", async (req, res) => {
  try {
    var accessCodeRef = firebase.database().ref("feedback");
    //.child("accessCode");
    accessCodeRef
      .orderByChild("test")
      .equalTo(5)
      //.limitToFirst(1)
      .on("value", function(data) {
        res.json(data);
      });
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});*/

router.post("/postfeedback", async (req, res) => {
  try {
    var companyID = req.body.companyID;
    var forumID = req.body.forumID;
    var name = req.body.forumName;

    console.log(name);
    var companiesRef = firebase
      .database()
      .ref("feedback")
      .child("companies");
    try {
      var selectCompanyRef = companiesRef.child(companyID);
    } catch (e) {
      console.log("test2");
      companiesRef.update({ companyID });
      var selectCompanyRef = companiesRef.child(companyID);
    }
    //console.log("test");
    try {
      var selectForumRef = firebase
        .database()
        .ref("feedback")
        .child("companies")
        .child(companyID)
        .child(forumID);
    } catch (e) {
      console.log("test2");
      selectCompanyRef.update({ forumID });
    }
    //console.log("test");
    //if (companiesRef != null) {
    selectForumRef.update({
      forumName: name,
      messages: "temp"
    });
    //console.log("test");

    var messagesRef = selectForumRef.child("messages");
    messagesRef.push(req.body.message);
    console.log("test");

    //.child("accessCode");
    /*companiesRef
      .orderByChild("userID")
      .equalTo("testUserID2")
      //.limitToFirst(1)
      .on("value", function(data) {
        res.json(data);
      });*/
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});

/*router.get("/test3", async (req, res) => {
  try {
    var testCodeRef = firebase
      .database()
      .ref("feedback")
      .child("accessCode");
    //testCodeRef.push({ message: "test" });
    testCodeRef.update({ test: "test" });
    res.send({
      message: "test"
    });
  } catch (e) {
    res.send({
      message: "Error Beep Boop"
    });
  }
});*/

module.exports = router;
