const putEvent = require("./eventHandler")[0];
const express = require("express");
const command = express.Router();
const uuid = require("uuid");

command.post("/postForum", (req, res) => {
    if (!req.body.companyID || !req.body.forumID || !req.body.name) {
        res.status(400).send('Invalid forum format!').end();
    }
    var dictForum = {
        command: "create forum",
        parentID: req.body.companyID,
        ID: req.body.forumID,
        content: req.body.name
    };
    if (putEvent(dictForum) !== -1) {
        res.status(200).send('Success!').end();
    }
    else {
        res.status(500).send('Could not upload forum!').end();
    }
});

command.post("/postTopic", (req, res) => {
    if (!req.body.forumID || !req.body.name) {
        res.status(400).send('Invalid topic format!').end();
        return;
    }
    const topicIDtemp = uuid.v4();
    var dictTopic = {
        command: "create topic",
        parentID: req.body.forumID,
        ID: topicIDtemp,
        content: req.body.name
    };
    if (putEvent(dictTopic) !== -1) {
        res.status(200).json({ID: topicIDtemp}).end();
    }
    else {
        res.status(500).send('Could not upload topic!').end();
    }
});

command.post("/postComment", (req, res) => {
    if (!req.body.parentID || !req.body.message) {
        res.status(400).send('Invalid comment format!').end();
        return;
    }
    const commentIDtemp = uuid.v4();
    var dictComment = {
        command: "create comment",
        parentID: req.body.parentID,
        ID: commentIDtemp,
        content: req.body.message
    };
    if (putEvent(dictComment) !== -1) {
        res.status(200).json({ID: commentIDtemp}).end();
    }
    else {
        res.status(500).send('Could not upload comment!').end();
    }
});

command.delete("/deleteEvent", (req, res) => {
    if(!req.body.ID) {
        res.status(400).send('Invalid comment format!').end();
        return;
    }
    var dict = {
        command: "delete event",
        ID: req.body.ID
    };
    if (putEvent(dict) !== -1) {
        console.log('here')
        res.status(200).send('Success!').end();
    }
    else {
        res.status(500).send('Could not delete event!').end();
    }
});

module.exports = command;