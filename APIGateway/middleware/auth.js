'use strict';
const jwt = require("jsonwebtoken");

const withAccessAuth = (req, res, next) => {
    const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, "AccessSecret");
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(500).send({ message: "Invalid Token" });
    }
};

const withCompanyAuth = (req, res, next) => {
    const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    if (!token) return res.status(401).json({ message: "Auth Error" });
    else {
        jwt.verify(token, "CompanySecret", (err, decoded) => {
            if(err) res.status(401).send('Unauthorized, Inavild token');
            else {
                next();
            }
        })
    }
};

module.exports = [withAccessAuth, withCompanyAuth];

