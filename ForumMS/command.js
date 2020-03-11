const eventHandler = require("./eventHandler");
const express = require("express");
const router = express.Router();
const { uuidv4 } = require("uuid");

router.post("/forum", (req, res) => {
    if(!req.body.compID || !req.body.forumID || !req.body.Name){
        res.status(400).send('Invalid forum format!');
        return;
    }

    var dictForum = {
        command: "create forum",
        compID: req.body.compID,
        forumID: req.body.forumID,
        forumName: req.body.Name
    };
    eventHandler(JSON.stringify(dictForum));
});

router.post("/topic", (req, res) => {
    if(!req.body.forumID || !req.body.Name){
        res.status(400).send('Invalid topic format!');
        return;
    }

    const topicIDtemp = uuidv4();

    var dictTopic = {
        command: "create topic",
        forumID: req.body.forumID,
        topicID: topicIDtemp,
        topicName: req.body.Name
    };
    eventHandler(JSON.stringify(dictTopic));
});

router.post("/comment", (req, res) => {
    if(!req.body.parentID || !req.body.message){
        res.status(400).send('Invalid comment format!');
        return;
    }

    var dictComment = {
        command: "create comment",
        parentID: req.body.parentID,
        message: req.body.message
    };
    eventHandler(JSON.stringify(dictComment));
});

module.exports = router;