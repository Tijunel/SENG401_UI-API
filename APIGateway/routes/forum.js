const express = require("express");
const router = express.Router();
const IP = require("../config/connections")
const http = require("http")
const withAccessAuth = require('../middleware/auth')[0];
const withCompanyAuth = require('../middleware/auth')[1];
const { forumServiceIP, forumServicePort } = require('../config/connections')


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
});

router.post('/postTopic', withCompanyAuth, async (req, res) => {
    try {
        let args = JSON.stringify({
            forumID: req.body.forumID,
            topicName: req.body.topicName,
        })

        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/topic',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        };

        let newReq = http.request(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(data);
            });
        })

        newReq.write(args)
        newReq.end()
    } catch (e) {
        res.status(401).send("Error creating topic.")
    }
})


router.post('/postComment', async (req, res) => {  //TODO: add access auth
    try {
        let args = JSON.stringify({
            parentID: req.body.parentID,
            message: req.body.message
        })

        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/comment',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        };

        let newReq = http.request(options)

        newReq.write(args)
        newReq.end()
    } catch (e) {
        res.status(401).send("Error creating comment.")
    }
})

router.get("/getTopic/:id", async (req, res) => {
    let options = {
        host: IP.forumServiceIP,
        port: IP.forumServicePort,
        path: '/query/getTopic/' + req.params.id,
        method: 'GET'
    };

    http.request(options, (newRes) => {
        newRes.on('data', (data) => {
            res.json(data);
        });
    })
})

router.get("/getForum/:id", withAccessAuth, async (req, res) => {
    let options = {
        host: IP.forumServiceIP,
        port: IP.forumServicePort,
        path: '/query/getForum/' + req.params.id,
        method: 'GET'
    };

    http.request(options, (newRes) => {
        newRes.on('data', (data) => {
            res.json(data);
        });
    })
})

router.get("/getForumList/:id", withCompanyAuth, async (req, res) => {
    let options = {
        host: IP.forumServiceIP,
        port: IP.forumServicePort,
        path: '/query/getForumList/' + req.params.id,
        method: 'GET'
    };

    http.request(options, (newRes) => {
        newRes.on('data', (data) => {
            res.json(data);
        });
    })
})


module.exports = router;
