const express = require("express");
const forum = express.Router();
const IP = require("../config/connections")
const http = require("http")
const withAccessAuth = require('../middleware/auth')[0];
const withCompanyAuth = require('../middleware/auth')[1];
const { forumServiceIP, forumServicePort } = require('../config/connections');

//Command Endpoints

forum.post("/postForum", withCompanyAuth, async (req, res) => {
    //Need to call this when creating a new forum
    try {
        let args = JSON.stringify({
            companyID: req.user.companyID,
            forumID: req.body.forumID,
            name: req.body.name
        })

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
    } catch (e) {
        res.status(401).send("Error posting forum").end();
    }
});

forum.post('/postTopic', withCompanyAuth, async (req, res) => {
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

        let newReq = http.request(options);
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(401).send("Error creating topic.").end();
    }
});

forum.post('/postComment', withAccessAuth || withCompanyAuth, async (req, res) => {  
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

        let newReq = http.request(options);
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(401).send("Error creating comment.").end();
    }
});

forum.delete('/deleteEvent', withCompanyAuth, async (req, res) => {
    try {
        let args = JSON.stringify({
            ID: req.body.id
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

        let newReq = http.request(options);
        newReq.write(args);
        newReq.end();
    } catch (e) {
        res.status(401).send("Error deleting event.").end();
    }
});


//Query Endpoints

forum.get("/getTopic/:id", withAccessAuth || withCompanyAuth, async (req, res) => {
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
    });
});

forum.get("/getForum/:id", withAccessAuth || withCompanyAuth, async (req, res) => {
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
    });
});

module.exports = forum;
