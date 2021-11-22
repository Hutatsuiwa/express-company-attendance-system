const express = require('express');
const router = express.Router();

const roomCtl = require('../controller/rooms');

/* 考场路由 */

// 获取考场列表
router.get("/search/all",roomCtl.getAllRoom);

// 修改考场信息
router.put("/updata",roomCtl.updateRoom);

// 添加考场信息
router.post("/add",roomCtl.addRoom);

// 删除考场
router.delete("/delete/:roomId",roomCtl.deleteRoom);

// 获取考场状态信息
router.get("/state/:roomId",roomCtl.getRoomStateByRoomName);

module.exports = router;

