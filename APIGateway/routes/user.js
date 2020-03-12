const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = express.Router();
const Forum = require('../model/Forum');
const User = require("../model/User");
const randomize = require("randomatic");
const withCompanyAuth = require('../middleware/auth')[1];

user.post("/signup", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        username,
        email,
        password,
    } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "User Already Exists" });

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "CompanySecret", { expiresIn: '30m' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true })
            res.status(200).json({
                name: user.name,
                email: user.email,
                // id: user.id
            });
        });
    } catch (err) {
        res.status(500).send("Error in Saving");
    }
});

user.post("/login", async (req, res) => {
    console.log("request made");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password !" });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "CompanySecret", { expiresIn: '30m' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({
                email: user.email,
                name: user.name,
                id: user.id
            });
        });
    } catch (e) {
        res.status(500).json({ message: "Server Error" });
    }
});

user.post("/createForum", withCompanyAuth, async (req, res) => {
    try {
        let accessCode = randomize('A0', 8)
        await User.findOneAndUpdate({ _id: req.body.id }, {
            $push: {
                forums: {
                    name: req.body.name,
                    accessCode: accessCode
                }
            }
        });
        res.status(200).json({
            name: req.body.name,
            accessCode: accessCode
        })
    } catch (e) {
        res.send({ message: "Error in Adding Forum" })
    }
});

user.post("/getForums", withCompanyAuth, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.id })
        res.json({
            forums: user.forums
        })
    } catch (e) {
        res.send({ message: "Error in Adding Forum" })
    }
});

user.post("/checkCompanyToken", withCompanyAuth, (req, res) => {
    res.sendStatus(200);
})

//For logging out, if needed
user.post('/stopSession', (req, res) => {

})

module.exports = user;
