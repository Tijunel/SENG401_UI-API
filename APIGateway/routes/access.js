const express = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const access = express.Router();
const Forum = require('../model/Forum');
const User = require("../model/User");
const withAccessAuth = require('../middleware/auth')[0];

access.post("/auth", async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        accessCode
    } = req.body;

    try {
        let forum = await User.aggregate([
            { $unwind: "$forums" },
            { $match: { "forums.accessCode": accessCode } },
            {
                $project: {
                    _id: 0,
                    id: "$forums._id",
                    name: "$forums.name",
                    accessCode: "$forums.accessCode"
                }
            }
        ]);

        let user = await User.findOne({ "forums.accessCode": accessCode })
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "AccessSecret", { expiresIn: '30m' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({
                name: forum[0].name,
                companyID: user.id,
                forumID: forum[0].id
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