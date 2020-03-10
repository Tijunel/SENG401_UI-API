const express = require("express");
const router = express.Router();
const http = require("http");
const IP = require("../config/connections");

options = {
    host: IP.feedbackServiceIP,
    port: IP.feedbackServicePort,
    path: '/feedback/test',
    method: 'GET',
};


router.get("/test", async (req, res) => {
    try {
        http.request(options, (httpResp) => {
            httpResp.on('data', (data) => {
                res.send(JSON.parse(data));
            });
        }).end();
    }
    catch (e) {

    }
});

module.exports = router;
