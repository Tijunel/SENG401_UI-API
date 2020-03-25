const express = require("express");
const router = express.Router();
const redis = require('redis');
const { PORT, HOST } = require('./redisEnv');

const client = redis.createClient({
    port: PORT,
    host: HOST
});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err);
});

client.get('test key', (err, res) => {
    if (err) {
        console.log("could not fetch key")
    }
    console.log(res)
});

//End points
router.get("/getTopic/:id", (req, res) => {
    // retrieve data using req.params.id as param to search DB
    let readData = JSON.stringify({
        topicName: "topic",
        comments: {
            "main1": { "level2": { "level3": {}, "level3.1": {} } }, "level2.1": {}
            , "main2": {}, "main3": { "level2": {}, "level2.1": { "level3": {} } }
        }
    });
    res.json(readData);
});

router.get("/getForum/:id", (req, res) => {
    let forum = {
        forumName: "",
        topics: []
    }
    client.get("content-" + req.params.id, (err, results) => {
        if (err || !results) {
            res.status(404).send("Could not find forum");
            return;
        }
        forum.forumName = results;
        client.get(req.params.id, (err, results) => {
            if (err) {
                res.status(404).send("Could not find forum");
                return;
            }
            for (topicID of results) {
                client.get("content-" + topicID, (err, results) => {
                    if (err) {
                        res.status(500).send("Error finding topics in Redis");
                        return;
                    }
                    forum.topics.push(results);
                });
            }
        });
    });
    res.json(forum);
});

router.get("/getForumList/:id", (req, res) => {
    let forums = []
    client.get(req.params.id, (err, results) => {
        if (err) {
            res.status(404).send("Could not find company");
            return;
        }
        for (topicID of results) {
            client.get("content-" + topicID, (err, results) => {
                if (err) {
                    res.status(500).send("Error finding forums in Redis");
                    return;
                }
                forums.push(results);
            });
        }
    });
    res.json(forum);
});

module.exports = router;