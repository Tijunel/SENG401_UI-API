const express = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const http = require("http");
const access = express.Router();
const IP = require("../config/connections");
const withAccessAuth = require('../middleware/auth')[0];

access.post("/auth", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        let options = {
            host: IP.forumServiceIP,
            port: IP.forumServicePort,
            path: '/query/auth/' + req.body.accessCode,
            method: 'GET'
        }
        http.get(options, (newRes) => {
            newRes.on('data', (data) => {
                data = JSON.parse(data);
                const payload = {
                    forum: {
                        forumName: data.name,
                        companyID: data.companyID,
                        forumID: data.forumID
                    }
                };
                jwt.sign(payload, "AccessSecret", { expiresIn: '30m' }, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { httpOnly: true })
                    res.status(200).json({
                        name: data.name,
                        forumID: data.forumID
                    }).end();
                });
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

access.post("/checkAccessToken", withAccessAuth, (req, res) => {
    res.sendStatus(200);
});

module.exports = access;