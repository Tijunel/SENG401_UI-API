const express = require("express");
const router = express.Router();
const redis = require('redis')
const client = redis.createClient({
    port: 6379,
    host: 'localhost'
})

client.on('connect', () => {
    console.log('Redis client connected')
})

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err)
})


client.get('test key', (err, res) => {
    if (err) {
        console.log("could not fetch key")
    }
    console.log(res)
})

router.get("/getTopic/:id", (req, res) => {

    // retirieve data using req.params.id as param to search DB
    let readData = JSON.stringify({
        // values will be fetched from database
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
    client.get("name-" + req.params.id, (err, results) => {
        if (err) {
            res.status(404).send("Could not find forum")
            return
        }
        forum.forumName = results

        client.get(req.params.id, (err, results) => {
            if (err) {
                res.status(404).send("Could not find forum")
                return
            }


            for (topicID of results) {
                client.get("name-" + topicID, (err, results) => {
                    if (err) {
                        res.status(500).send("Error finding topics in Redis")
                        return
                    }

                    forum.topics.push(results)
                })
            }
        })
    })


    // retirieve data using req.params.id as param to search DB
    let readData = JSON.stringify({
        // values will be fetched from database
        forumName: "forum",
        topicList: ["topic1", "topic2", "topic3"]
    })
    res.json(readData);
});

router.get("/getForumList/:id", (req, res) => {
    // retirieve data using req.params.id as param to search DB
    let readData = JSON.stringify({
        // values will be fetched from database
        companyName: "company",
        forumList: ["forum1", "forum2"]
    })
    res.json(readData);
});

module.exports = router;