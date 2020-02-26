const express = require("express");
const router = express.Router();
const forumServiceIP = require("../config/connections")

module.exports = router;


router.get('/', async (req, res) => {
    fetch(forumServiceIP)
        .then(res => res.json())
        .then(data => res.json({ message: data }))
})


module.exports = router;
