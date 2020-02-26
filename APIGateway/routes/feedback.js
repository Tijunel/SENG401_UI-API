const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
    try {
        fetch('10.13.110.106:4000/feedback/test')
            .then(res => res.json())
            .then(body => console.log(body));
    }
    catch (e) {

    }
});

module.exports = router;