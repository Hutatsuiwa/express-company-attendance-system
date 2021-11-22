const express = require('express');
const router = express.Router();
const imageValidator = require('../validator/baidu');

// const middleware = require("../middleware/baidu")
const controller = require("../controller/baidu");
const imageFormat = require("../middleware/imageFormat");

//人脸匹配
router.post("/match",imageValidator, imageFormat, controller.matchFace);

//人脸注册
router.post("/register",imageValidator, imageFormat, controller.registerFace);

//人脸检测
router.post("/check",imageValidator, imageFormat, controller.cheackFace);

//人脸用户删除
router.delete("/delete/:groupId/:userId", controller.deleteFaceUser);

module.exports = router;