const express = require("express");
const router = express.Router();
const redis = require('redis');
const asyncRedis = require("async-redis");
const { PORT, HOST } = require('./redisEnv');

const client = redis.createClient({
    port: PORT,
    host: HOST
});

const asyncClient = asyncRedis.createClient({
    port: PORT,
    host: HOST
})

client.on('connect', () => {
    console.log('Query Redis client connected')
})

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err);
});

getComments = (commentID) => {
    let comment = {
        id: "",
        message: "",
        replies: []
    }
    comment.id = commentID;
    var comments = asyncClient.get('EventContent-' + commentID)
        .then(async message => {
            comment.message = message;
            await asyncClient.lrange(commentID, 0, -1).then(async results => {
                if (results.length > 0) {
                    for (const event of results) {
                        await getComments(event)
                            .then(newComment => {
                                comment.replies.push(newComment);
                            })
                    }
                }
            });
        })
        .then(() => { return comment; });
    return comments;
}

router.get("/getTopic/:id", (req, res) => {
    let ID = req.params.id;
    let topic = {
        topicName: "",
        comments: []
    }
    client.get('EventContent-' + ID, (err, result) => {
        if (err || !result) {
            res.status(404).send('Could not find topic name.').end();
            return;
        }
        topic.topicName = result;
        client.lrange(ID, 0, -1, async (err, results) => {
            for (comment of results) {
                //console.log(await getComments(comment))
                topic.comments.push(await getComments(comment));
            }
            res.json(topic)
        });
    });
});

router.get("/getForum/:id", async (req, res) => {
    let ID = req.params.id
    let forum = {
        forumName: "",
        topics: []
    }
    client.get("EventContent-" + ID, (err, result) => {
        if (err || !result) {
            res.status(404).send('Could not find forum name.').end();
            return;
        }
        forum.forumName = result;
        client.lrange(ID, 0, -1, (err, results) => {
            if (err) {
                res.status(404).send("Could not find forum topics").end();
                return;
            }
            const topicsNum = results.length;
            var topicsAccumulated = 0;
            for (topicID of results) {
                client.get("EventContent-" + topicID, (err, result) => {
                    if (err) {
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

module.exports = router;
