const express = require('express')
const router = express.Router();

const middleware = require("../middleware/baidu")
const controller = require("../controller/baidu")

router.post("/match",middleware.cheackFace,controller.matchFace)

router.post("/register",middleware.cheackFace,controller.registerFace)

module.exports = router;