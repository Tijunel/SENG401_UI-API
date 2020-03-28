'use strict';
const jwt = require("jsonwebtoken");

const withAccessAuth = (req, res, next) => {
    const token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) return res.status(401).json({ message: "Auth Error" });
    else {
        jwt.verify(token, "AccessSecret", (err, decoded) => {
            if (err) res.status(401).send('Unauthorized, Invalid token');
            else { 
                req.forum = decoded.forum;
                next();
            }
        })
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
            if (err) res.status(401).send('Unauthorized, Inavalid token');
            else {
                req.user = decoded.user;
                next();
            }
        })
    }
};

const withAuth = (req, res, next) => {
    const token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) return res.status(401).json({ message: "Auth Error" }).end();
    else {
        jwt.verify(token, "CompanySecret", (err, decoded) => {
            if (err) {
                jwt.verify(token, "AccessSecret", (err, forumDecoded) => {
                    if (err) res.status(401).send('Unauthorized, Invalid token');
                    else {
                        req.forum = forumDecoded.forum;
                        next();
                    }
                })
            }
            else {
                req.user = decoded.user;
                next();
            }
        })
    }
}

module.exports = [withAccessAuth, withCompanyAuth, withAuth];

