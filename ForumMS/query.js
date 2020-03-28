const express = require("express");
const query = express.Router();
const client = require("./redisEnv")[0];
const asyncClient = require("./redisEnv")[1];

getComments = async (commentID) => {
    let comment = {
        id: "",
        parentID: "",
        message: "",
        replies: []
    }
    comment.id = commentID;
    var comments = asyncClient.get("EventContent-" + commentID)
        .then(async message => {
            comment.message = message;
            await asyncClient.get("EventParent-" + commentID)
                .then(async parentID => {
                    comment.parentID = parentID;
                    await asyncClient.lrange(commentID, 0, -1).then(async results => {
                        if (results.length > 0) {
                            for (const event of results) {
                                await getComments(event)
                                    .then(newComment => {
                                        comment.replies.push(newComment);
                                    });
                            }
                        }
                    });
                });
        })
        .then(() => { return comment; });
    return comments;
}

query.get("/getTopic/:id", (req, res) => {
    let ID = req.params.id;
    let topic = {
        topicName: "",
        comments: []
    }
    client.get("EventContent-" + ID, (err, result) => {
        if (err || !result) {
            res.status(404).send("Could not find topic name.").end();
            return;
        }
        topic.topicName = result;
        client.lrange(ID, 0, -1, async (err, results) => {
            for (comment of results) {
                topic.comments.push(await getComments(comment));
            }
            res.status(200).json(topic).end();
        });
    });
});

query.get("/getForums/:id", (req, res) => {
    let ID = req.params.id;
    let forums = {
        forums: []
    }
    client.lrange(ID, 0, -1, (err, results) => {
        if (err || !results) {
            res.status(404).send("Could not find company.").end();
            return;
        }
        const forumsNum = results.length;
        var forumsAccumulated = 0;
        for (const forumID of results) {
            client.get("EventContent-" + forumID, (err, result) => {
                if (err) {
                    res.status(500).send("Error finding forums in Redis").end();
                    return;
                }
                forums.forums.push({
                    accessCode: forumID,
                    name: result
                });
                forumsAccumulated += 1;
                if (forumsAccumulated === forumsNum) {
                    res.status(200).json(forums).end();
                }
            });
        }
    });
});

query.get("/getForum/:id", async (req, res) => {
    let ID = req.params.id;
    let forum = {
        forumName: "",
        topics: []
    }
    client.get("EventContent-" + ID, (err, result) => {
        if (err || !result) {
            res.status(404).send("Could not find forum name.").end();
            return;
        }
        forum.forumName = result;
        client.lrange(ID, 0, -1, (err, results) => {
            if (err || !results) {
                res.status(404).send("Could not find forum topics").end();
                return;
            }
            const topicsNum = results.length;
            if (results.length === 0) {
                res.status(400).end();
            }
            var topicsAccumulated = 0;
            for (const topicID of results) {
                client.get("EventContent-" + topicID, (err, result) => {
                    if (err || !results) {
                        res.status(500).send("Error finding topics in Redis").end();
                        return;
                    }
                    forum.topics.push({
                        ID: topicID,
                        name: result
                    });
                    topicsAccumulated += 1;
                    if (topicsAccumulated === topicsNum) {
                        res.status(200).json(forum).end();
                    }
                });
            }
        });
    });
});

query.get("/auth/:id", async (req, res) => {
    let accessCode = req.params.id;
    let info = {
        name: "",
        companyID: "",
        forumID: ""
    }
    client.get("EventContent-" + accessCode, (err, result) => {
        if (err || !result) {
            res.status(404).send("Could not find forum.").end();
            return;
        }
        info.forumID = accessCode;
        info.name = result;
        client.get("EventParent-" + accessCode, (err, parent) => {
            if (err) {
                res.status(500).send("Could not find parent of forum.").end();
                return;
            }
            info.companyID = parent;
            res.status(200).json(info).end();
        });
    });
});

module.exports = query;
