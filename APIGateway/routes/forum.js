const express = require("express");
const router = express.Router();
const IP = require("../config/connections")
const http = require("http")



router.get('/test', async (req, res) => {
    let options = {
        host: '10.13.60.26',
        port: 3000,
        path: '/',
        method: 'GET',
    };
    http.request(options, (httpResp) => {
        httpResp.on('data', (data) => {
            res.send(JSON.parse(data));
        });
    }).end();
})


module.exports = router;
