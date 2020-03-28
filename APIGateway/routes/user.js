const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = express.Router();
const User = require("../model/User");
const withCompanyAuth = require("../middleware/auth")[1];

user.post("/signup", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        }).end();
    }
    const {
        username,
        email,
        password,
    } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send("User Already Exists").end();
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
                companyID: user.id
            }
        };
        jwt.sign(payload, "CompanySecret", { expiresIn: "30m" }, (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({
                name: user.username,
                email: user.email
            }).end();
        });
    } catch (err) {
        res.status(500).send("Error in Saving").end();
    }
});

user.post("/login", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).end();
        return;
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password !" });
        const payload = {
            user: {
                companyID: user.id
            }
        };
        jwt.sign(payload, "CompanySecret", { expiresIn: "30m" }, (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({
                email: user.email,
                name: user.username
            }).end();
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" }).end();
    }
});

user.post("/checkCompanyToken", withCompanyAuth, (req, res) => {
    res.sendStatus(200).end();
})

//For logging out, if needed
user.post("/stopSession", (req, res) => {

});

module.exports = user;
