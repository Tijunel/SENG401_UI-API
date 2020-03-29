const express = require("express");
const forum = express.Router();
const IP = require("../config/connections");
const http = require("http");
const randomize = require("randomatic");
const withAuth = require("../middleware/auth")[2];
const withCompanyAuth = require("../middleware/auth")[1];

//Command Endpoints
forum.post("/postForum", withCompanyAuth, async (req, res) => {
    if(!req.body.name) {
        res.status(400).send("Bad Request!").end();
        return;
    } 
    try {
        let accessCode = randomize("A0", 8)
        let args = JSON.stringify({
            companyID: req.user.companyID,
            forumID: accessCode,
            name: req.body.name
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/command/postForum",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": args.length
            }
        }
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            } else {
                res.status(200).json({
                    name: req.body.name,
                    accessCode: accessCode
                }).end();
            }
        }).on("error", error => {
            res.status(500).send("Error posting forum!").end();
        });
        newReq.write(args);
        newReq.end();
    } catch (err) {
        res.status(500).send("Error posting forum!").end();
    }
});

forum.post("/postTopic", withAuth, async (req, res) => {
    if(!req.body.topicName || !req.body.forumID) {
        res.status(400).send("Bad Request!").end();
        return;
    } 
    try {
        let args = JSON.stringify({
            forumID: req.body.forumID,
            name: req.body.topicName,
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/command/postTopic",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": args.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
                return;
            }
            newRes.on("data", (data) => {
                try {
                    res.json(JSON.parse(data));
                } catch (err) {
                    res.status(500).send("Error posting topic!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error posting topic!").end();
        });
        newReq.write(args);
        newReq.end();
    } catch (err) {
        res.status(500).send("Error posting topic!").end();
    }
});

forum.post("/postComment", withAuth, async (req, res) => { 
    if(!req.body.message || !req.body.parentID) {
        res.status(400).send("Bad Request!").end();
        return;
    } 
    try {
        let args = JSON.stringify({
            parentID: req.body.parentID,
            message: req.body.message
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/command/postComment",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": args.length
            }
        };
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
                return;
            }
            newRes.on("data", (data) => {
                try {
                    res.json(JSON.parse(data));
                } catch (err) {
                    res.status(500).send("Error posting topic!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error posting comment!").end();
        });
        newReq.write(args);
        newReq.end();
    } catch (err) {
        res.status(500).send("Error posting comment!").end();
    }
});

forum.delete("/deleteEvent", withCompanyAuth, async (req, res) => {
    if(!req.body.ID) {
        res.status(400).send("Bad Request!").end();
        return;
    } 
    try {
        let args = JSON.stringify({
            ID: req.body.ID
        });
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/command/deleteEvent",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": args.length
            }
        }
        let newReq = http.request(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
            } else {
                res.status(200).send("Success!").end();
            }
        }).on("error", error => {
            res.status(500).send("Error deleting event!").end();
        });
        newReq.write(args);
        newReq.end();
    } catch (err) {
        res.status(500).send("Error deleting event!").end();
    }
});

//Query Endpoints
forum.get("/getTopic/:id", withAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/query/getTopic/" + req.params.id,
            method: "GET"
        };
        http.get(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
                return;
            }
            newRes.on("data", (data) => {
                try {
                    res.json(JSON.parse(data));
                } catch (err) {
                    res.status(500).send("Error posting topic!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error getting topic!").end();
        });
    } catch (err) {
        res.status(404).send("Error getting topic!").end();
    }
});

forum.get("/getForums", withCompanyAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/query/getForums/" + req.user.companyID,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        http.get(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
                return;
            }
            newRes.on("data", (data) => {
                try {
                    res.json(JSON.parse(data));
                } catch (err) {
                    res.status(500).send("Error posting topic!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error getting forums!").end();
        });
    } catch (err) {
        res.status(401).send("Error getting forums!").end();
    }
});

forum.get("/getForum/:id", withAuth, async (req, res) => {
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: "/query/getForum/" + req.params.id,
            method: "GET"
        };
        http.get(options, (newRes) => {
            if(newRes.statusCode !== 200) {
                res.status(400).send("Error").end();
                return;
            }
            newRes.on("data", (data) => {
                try {
                    res.json(JSON.parse(data));
                } catch (err) {
                    res.status(500).send("Error posting topic!").end();
                }
            });
        }).on("error", error => {
            res.status(500).send("Error getting forum!").end();
        });
    } catch (err) {
        res.status(500).send("Error getting forum!").end();
    }
});

module.exports = forum;
