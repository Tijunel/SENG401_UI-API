const firebase = require("firebase/app");
const firebaseDatabse = require("firebase/database");
const express = require("express");
const feedback = express.Router();
const config = {
	apiKey: "AIzaSyB_4QWyx3NWR00xtwofQ8shIeIU6noLVFw",
	authDomain: "aonfeedback.firebaseapp.com/",
	databaseURL: "https://aonfeedback.firebaseio.com"
};

firebase.initializeApp(config);

feedback.post("/submitFeedback", async (req, res) => {
	try {
		//Check if this exists
		var companyID = req.body.companyID;
		var forumID = req.body.forumID;
		var forumName = req.body.forumName;
		var message = req.body.message;
		var forumRef = firebase
			.database()
			.ref("feedback")
			.child("companies")
			.child(companyID)
			.child(forumID);
		var messageRef = forumRef.child("messages");
		messageRef.push(message);
		var nameRef = forumRef.child("name");
		nameRef.set(forumName);
		res.sendStatus(200);
	} catch (e) {
		res.status(500).send("Error submitting feedback!").end();
	}
});

feedback.get("/getFeedback/:id", async (req, res) => {
	try {
		var companyID = req.params.id;
		var companyRef = firebase
			.database()
			.ref("feedback")
			.child("companies")
			.child(companyID);
		var allMessages = [];
		await companyRef.once('value').then(snapshot => {
			var i = 0;
			snapshot.forEach((child) => {
				let forumName = child.val().name;
				allMessages.push({ forumName: forumName, messages: [] });
				var messages = child.val().messages;
				for (message in messages) {
					allMessages[i].messages.push(messages[message]);
				}
				i++;
			});
		});
		res.status(200).json(allMessages).end();
	} catch (e) {
		res.status(500).send("Error fetching feedback!").end();
	}
});

module.exports = feedback;
