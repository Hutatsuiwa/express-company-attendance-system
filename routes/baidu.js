const express = require('express');
const router = express.Router();

// const middleware = require("../middleware/baidu")
const controller = require("../controller/baidu");
const imageFormat = require("../middleware/imageFormat");

router.post("/match",imageFormat,controller.matchFace);

router.post("/register",imageFormat,controller.registerFace);

router.post("/check",imageFormat,controller.cheackFace);

router.delete("/delete/:groupId/:userId",controller.deleteFaceUser);

module.exports = router;