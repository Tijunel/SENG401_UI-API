const express = require("express");
const feedback = express.Router();
const http = require("http");
const IP = require("../config/connections");
const withAccessAuth = require("../middleware/auth")[0];
const withCompanyAuth = require("../middleware/auth")[1];

feedback.get("/getFeedback", withCompanyAuth, async (req, res) => {
    try {
        let options = {
            host: IP.feedbackServiceIP,
            port: IP.feedbackServicePort,
            path: "/feedback/getFeedback/" + req.user.companyID,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        http.get(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Bad Request!").end();
            } 
            newRes.on("data", (data) => {
                try {
                    data = JSON.parse(data);
                    res.json(data);
                } catch (err) {
                    res.status(500).send("Error fetching feedback!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error fetching feedback!").end();
        });
    } catch (err) {
        res.status(500).send("Error fetching feedback!").end();
    }
});

feedback.post("/submitFeedback", withAccessAuth, async (req, res) => {
    try {
        let data = JSON.stringify({
            companyID: req.forum.companyID,
            forumID: req.forum.forumID,
            forumName: req.forum.forumName,
            message: req.body.message
        })
        let options = {
            host: IP.feedbackServiceIP,
            port: IP.feedbackServicePort,
            path: "/feedback/submitFeedback",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            }
        }).on("error", function (e) {
            res.status(500).send("Error posting feedback!").end();
        });
        newReq.write(data);
        newReq.end();
    } catch (e) {
        res.status(401).send("Error posting feedback!").end();
    }
});

module.exports = feedback;
