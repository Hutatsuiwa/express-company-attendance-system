const express = require('express');
const router = express.Router();

const roomCtl = require('../controller/rooms');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
// const isStudnet = require('../middleware/isStudent')

/* 考场路由 */

// 获取所有考场信息
router.get("/search/all",authorization,roomCtl.getAllRoom);

// 修改考场信息
router.put("/update",authorization,isAdmin,roomCtl.updateRoom);

// 添加考场信息
router.post("/add",authorization,isAdmin,roomCtl.addRoom);

// 删除考场
router.delete("/delete/:roomId",authorization,isAdmin,roomCtl.deleteRoom);

// 通过考场名获取考场信息
router.get("/search/:roomName",authorization,roomCtl.getRoomByRoomName);

// 获取考场状态信息
router.get("/state/:roomName",authorization,roomCtl.getRoomStateByRoomName);

module.exports = router;

