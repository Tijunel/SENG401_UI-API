const putEvent = require("./eventHandler")[0];
const express = require("express");
const router = express.Router();
const { uuidv4 } = require("uuid");

router.post("/createForum", (req, res) => {
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
    putEvent(dictForum);
});

router.delete("/deleteForum", (req, res) => {
    if (!req.body.compID || !req.body.forumID) {
        res.status(400).send('Invalid forum format!');
        return;
    }
    var dictForum = {
        command: "delete forum",
        parentId: req.body.compID,
        Id: req.body.forumID
    };
    putEvent(dictForum);
})

router.post("/createTopic", (req, res) => {
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
    putEvent(dictTopic);
});

router.delete("/deleteTopic", (req, res) => {
    if (!req.body.forumID || !req.body.topicID) {
        res.status(400).send('Invalid topic format!');
        return;
    }
    var dictTopic = {
        command: 'delete topic',
        parentID: req.body.forumID,
        ID: req.body.topicID
    }
    putEvent(dictTopic);
});

router.post("/createComment", (req, res) => {
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
    putEvent(dictComment);
});

router.delete("/deleteComment", (req, res) => {
    if (!req.body.parentID || !req.body.commentID) {
        res.status(400).send('Invalid comment format!');
        return;
    }
    var dictComment = {
        command: 'delete comment',
        parentID: req.body.parentID,
        ID: req.body.commentID
    }
    putEvent(dictComment);
})

module.exports = router;