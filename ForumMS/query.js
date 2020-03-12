const express = require("express");
const router = express.Router();

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