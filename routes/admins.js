const express = require('express');
const router = express.Router();

const adminCtl = require('../controller/admins');

// const userValidotor = require('../validator/users');

const authorization = require('../middleware/authorization');

// 获取所有管理员信息
router.get("/search/all",adminCtl.getAllAdmins)

// 通过用户名获取管理员信息
router.get("/search/:username",adminCtl.getAdminByName);

// 修改管理员信息
router.put("/updata",adminCtl.updateAdmin);

// 通过用户名删除管理员信息
router.delete("/delete/:username",adminCtl.deleteUser);

// 添加管理员信息
router.post("/add",adminCtl.addAdmin);

// 管理员登陆
router.post("/login",adminCtl.loginAdmin);

// 获取登陆管理员个人信息
router.get("/myself",adminCtl.adminMyself);

module.exports = router;



