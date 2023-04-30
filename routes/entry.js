const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    const time = new Date();
    console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${
            req.method
        } ${req.url}`
    );
    next();
});

router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
