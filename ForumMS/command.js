const eventHandler = require("./eventHandler");
const express = require("express");
const router = express.Router();
const { uuidv4 } = require("uuid");

router.post("/forum", (req, res) => {
    if (!req.body.compID || !req.body.forumID || !req.body.Name) {
        res.status(400).send('Invalid forum format!');
        return;
    }

    var dictForum = {
        command: "create forum",
        parentID: req.body.compID,
        ID: req.body.forumID,
        content: req.body.Name
    };
    eventHandler(dictForum);
});

router.post("/topic", (req, res) => {
    if (!req.body.forumID || !req.body.Name) {
        res.status(400).send('Invalid topic format!');
        return;
    }

    const topicIDtemp = uuidv4();

    var dictTopic = {
        command: "create topic",
        parentID: req.body.forumID,
        ID: topicIDtemp,
        content: req.body.Name
    };
    eventHandler(dictTopic);
});

router.post("/comment", (req, res) => {
    if (!req.body.parentID || !req.body.message) {
        res.status(400).send('Invalid comment format!');
        return;
    }

    const commentIDtemp = uuidv4();


    var dictComment = {
        command: "create comment",
        parentID: req.body.parentID,
        ID: commentIDtemp,
        content: req.body.message
    };
    eventHandler(dictComment);
});

module.exports = router;