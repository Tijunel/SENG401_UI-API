const express = require("express");
const router = express.Router();
const IP = require("../config/connections")

options = {
    host: IP.forumServiceIP,
    port: IP.forumServicePort,
    path: '/',
    method: 'GET',
};

router.get('/', async (req, res) => {
    http.request(options, (httpResp) => {
        httpResp.on('data', (data) => {
            res.send(JSON.parse(data));
        });
    }).end();
})


module.exports = router;
