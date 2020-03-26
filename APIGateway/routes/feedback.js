const express = require("express");
const feedback = express.Router();
const http = require("http");
const IP = require("../config/connections");
const withAccessAuth = require('../middleware/auth')[0];
const withCompanyAuth = require('../middleware/auth')[1];
const { feedbackServiceIP, feedbackServicePort } = require('../config/connections')

feedback.post("/getFeedback", withCompanyAuth, async (req, res) => {
    try {
        let data = JSON.stringify({
            companyID: req.user.companyID
        });
        let options = {
            host: feedbackServiceIP,
            port: feedbackServicePort,
            path: '/feedback/getFeedback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        });
        newReq.on('error', error => {
            console.error(error)
        });
        newReq.write(data)
        newReq.end()
    } catch (e) {
        res.status(401).send("Error fetching feedback.")
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
            host: feedbackServiceIP,
            port: feedbackServicePort,
            path: '/feedback/submitFeedback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(data);
            });
        })
        newReq.on('error', function (e) {
            console.error(e);
        });
        newReq.write(data)
        newReq.end()
    } catch (e) {
        res.status(401).send("Error posting feedback.")
    }
});

module.exports = feedback;
