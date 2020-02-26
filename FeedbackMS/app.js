var firebase = require("firebase/app");
var firebaseDatabase = require("firebase/database");

const config = {
  apiKey: "AIzaSyB4rLgkyfAW7qA2LifH4LHLXpCSh9jr7D8",
  authDomain: "aonfeedback.firebaseapp.com/",
  databaseURL: "https://aonfeedback.firebaseio.com"
};
firebase.initializeApp(config);

var databaseRef = firebase.database().ref();
var feedbackRef = databaseRef.child("feedback");
feedbackRef.push("test");
