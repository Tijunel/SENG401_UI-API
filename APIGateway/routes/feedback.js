const express = require("express");
const router = express.Router();
const http = require("http");
const IP = require("../config/connections");
const authAccessCode = require("../middleware/authAccessCode")
const auth = require("../middleware/auth")

router.get("/test", async (req, res) => {
    let options = {
        host: IP.feedbackServiceIP,
        port: IP.feedbackServicePort,
        path: '/feedback/test',
        method: 'GET',
    };

    try {
        http.request(options, (httpResp) => {
            httpResp.on('data', (data) => {
                res.send(JSON.parse(data));
            });
        }).end();
    }
    catch (e) {

    }
});

router.get("/feedback", auth, async (req, res) => {
    try {

        let options = {
            host: IP.feedbackServiceIP,
            port: IP.feedbackServicePort,
            path: '/feedback/' + req.user.id,
            method: 'GET',
        };

        http.request(options, (res) => {
            res.on('data', (data) => {
                res.json(data);
            });
        }).end();

    } catch (e) {
        res.status(401).send("Error fetching feedback.")
    }

})

router.post("/feedback", authAccessCode, async (req, res) => {
    try {

        let args = JSON.stringify({
            companyID: req.forum.companyID,
            forumID: req.forum.forumID,
            forumName: req.forum.forumName,
            message: req.message
        })

        let options = {
            host: IP.feedbackServiceIP,
            port: IP.feedbackServicePort,
            path: '/feedback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        };

        let newReq = http.request(options, (res) => {
            res.on('data', (data) => {
                res.json(data);
            });
        })

        req.write(args)
        req.end()

    } catch (e) {
        res.status(401).send("Error posting feedback.")
    }
})

module.exports = router;
