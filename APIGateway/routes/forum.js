const express = require("express");
const forum = express.Router();
const IP = require("../config/connections");
const http = require("http");
const randomize = require("randomatic");
const withAuth = require('../middleware/auth')[2];
const withCompanyAuth = require('../middleware/auth')[1];

//Command Endpoints
forum.post("/postForum", withCompanyAuth, async (req, res) => {
    try {
        let accessCode = randomize('A0', 8)
        let args = JSON.stringify({
            companyID: req.user.companyID,
            forumID: accessCode,
            name: req.body.name
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/postForum',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        }
        let newReq = http.request(options);
        newReq.write(args);
        newReq.end();
        res.status(200).json({
            name: req.body.name,
            accessCode: accessCode
        }).end();
    } catch (e) {
        res.status(500).send({ message: "Error in Adding Forum" })
    }
});

forum.post('/postTopic', withAuth, async (req, res) => {
    try {
        let args = JSON.stringify({
            forumID: req.body.forumID,
            name: req.body.topicName,
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/postTopic',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        });
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(500).send("Error creating topic.").end();
    }
});

forum.post('/postComment', withAuth, async (req, res) => { //Make withAuth that checks if you have either
    try {
        let args = JSON.stringify({
            parentID: req.body.parentID,
            message: req.body.message
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/postComment',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            }
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        });
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(500).send("Error creating comment.").end();
    }
});

forum.delete('/deleteEvent', withCompanyAuth, async (req, res) => {
    try {
        let args = JSON.stringify({
            ID: req.body.ID
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/command/deleteEvent',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': args.length
            }
        }
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            }
            else {
                res.status(200).send('Success!').end();
            }
        });
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(500).send("Error deleting event.").end();
    }
});

//Query Endpoints
forum.get("/getTopic/:id", withAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/query/getTopic/' + req.params.id,
            method: 'GET'
        };
        http.get(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        });
    } catch (e) {
        res.status(404).send("Comments not found.").end();
    }
});

forum.get("/getForums", withCompanyAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/query/getForums/' + req.user.companyID,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let newReq = http.get(options, (newRes) => {
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        });
        newReq.on('error', error => {
            console.error(error)
        });
    } catch (e) {
        res.status(401).send("Error getting forums.").end();
    }
});

forum.get("/getForum/:id", withAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/query/getForum/' + req.params.id,
            method: 'GET'
        };
        http.get(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            }
            newRes.on('data', (data) => {
                res.json(JSON.parse(data));
            });
        }).on('error', error => {
            res.status(400).send("Error").end();
        });
    } catch (e) {
        res.status(400).send("Error getting forum.").end();
    }
});

module.exports = forum;
