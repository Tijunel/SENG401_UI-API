const express = require("express");
const router = express.Router();
const http = require("http");
const IP = require("../config/connections");
const withAccessAuth = require('../middleware/auth')[0];
const withCompanyAuth = require('../middleware/auth')[1];

router.post("/getFeedback", withCompanyAuth, async (req, res) => {
    try {
        let data = JSON.stringify({
            companyID: req.forum.companyID
        });

        let options = {
            host: '127.0.0.1',
            port: 5000,
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
        })
        newReq.write(data)
        newReq.end()
    } catch (e) {
        res.status(401).send("Error fetching feedback.")
    }

})

router.post("/submitFeedback", withAccessAuth, async (req, res) => {
    try {
        let data = JSON.stringify({
            companyID: req.forum.companyID,
            forumID: req.forum.forumID,
            forumName: req.forum.forumName,
            message: req.body.message
        })

        let options = {
            host: '127.0.0.1',
            port: 5000,
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

module.exports = router;
