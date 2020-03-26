const putEvent = require("./eventHandler")[0];
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

//Forum Endpoints
router.post("/createForum", (req, res) => {
    if (!req.body.companyID || !req.body.forumID || !req.body.name) {
        res.status(400).send('Invalid forum format!').end();
    }
    var dictForum = {
        command: "create forum",
        parentID: req.body.companyID,
        ID: req.body.forumID,
        content: req.body.name
    };
    putEvent(dictForum);
});

//Topic Endpoints
router.post("/createTopic", (req, res) => {
    if (!req.body.forumID || !req.body.name) {
        res.status(400).send('Invalid topic format!').end();
    }
    const topicIDtemp = uuid.v4();
    var dictTopic = {
        command: "create topic",
        parentID: req.body.forumID,
        ID: topicIDtemp,
        content: req.body.name
    };
    putEvent(dictTopic);
});

//Comment Endpoints
router.post("/createComment", (req, res) => {
    if (!req.body.topicID || !req.body.message) {
        res.status(400).send('Invalid comment format!').end();
    }
    const commentIDtemp = uuid.v4();
    var dictComment = {
        command: "create comment",
        parentID: req.body.topicID,
        ID: commentIDtemp,
        content: req.body.message
    };
    putEvent(dictComment);
});

router.delete("/deleteEvent", (req, res) => {
    if(!req.body.ID) {
        res.status(400).send('Invalid comment format!').end();
    }
    var dict = {
        command: "delete event",
        ID: req.body.ID
    };
    if (putEvent(dict) !== -1) {
        res.status(200).send('Success!').end();
    }
});

module.exports = router;