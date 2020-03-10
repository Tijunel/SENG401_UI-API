const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require('../middleware/auth');
const Forum = require('../model/Forum');
const User = require("../model/User");
const authAccessCode = require("../middleware/authAccessCode");

router.post(
    "/authAccess",
    [
        check("accessCode", "Please Enter a Valid accessCode")
            .not()
            .isEmpty(),
        check("accessCode", "Please enter a valid password").isLength({
            min: 8
        })
    ],

    async (req, res) => {
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

            ])
            let user = await User.findOne({
                "forums.accessCode": accessCode
            })
            const payload = {
                forum: {
                    fid: forum[0].id,
                    fname: forum[0].name,
                    uid: user.id
                }
            };

            jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).json({
                        token
                    });
                }
            );


        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.get("/me", authAccessCode, async (req, res) => {
    try {
        res.json({
            fid: req.forum.fid,
            fname: req.forum.fname,
            uid: req.forum.uid
        });

    } catch (e) {
        res.send({ message: "Error in Fetching Forum" });
    }
});

module.exports = router;