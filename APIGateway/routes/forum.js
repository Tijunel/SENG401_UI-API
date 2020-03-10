const express = require("express");
const router = express.Router();
const IP = require("../config/connections")
const http = require("http")
const auth = require("../middleware/auth")
const authAccessCode = require("../middleware/authAccessCode")



router.get('/test', async (req, res) => {
    let options = {
        host: '10.13.60.26',
        port: 3000,
        path: '/',
        method: 'GET',
    };
    http.request(options, (httpResp) => {
        httpResp.on('data', (data) => {
            res.send(JSON.parse(data));
        });
    }).end();
})

router.post('/topic', auth, async (req, res) => {
    try {

        let args = JSON.stringify({
            forumID: req.body.forumID,
            topicName: req.body.topicName,
        })

        let options = {
            host: IP.forumServiceIP,
            port: IP.feedbackServicePort,
            path: '/command/topic',
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
        res.status(401).send("Error creating topic.")
    }
})


router.post('/comment', authAccessCode, async (req, res) => {
    try {

        let args = JSON.stringify({
            parentID: req.body.parentID,
            message: req.body.message
        })

        let options = {
            host: IP.forumServiceIP,
            port: IP.feedbackServicePort,
            path: '/forum/comment',
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
        res.status(401).send("Error creating comment.")
    }
})


module.exports = router;
