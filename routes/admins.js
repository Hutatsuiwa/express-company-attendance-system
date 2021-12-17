const express = require('express');
const router = express.Router();

const adminCtl = require('../controller/admins');

const passwordMd5 = require('../middleware/passwordMd5')

//输入数据检测、验证
const adminValidotor = require('../validator/admins');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')

// 获取所有管理员信息
router.get("/search/all",authorization,isAdmin,adminCtl.getAllAdmins)

// 通过用户名获取管理员信息
router.get("/search/:username",authorization,isAdmin,adminValidotor.find,adminCtl.getAdminByName);

// 修改管理员信息
router.put("/update",passwordMd5,authorization,isAdmin,adminValidotor.update,adminCtl.updateAdmin);

// 通过用户ID删除管理员信息
router.delete("/delete/:userId",authorization,isAdmin,adminValidotor.delete,adminCtl.deleteAdmin);

// 添加管理员信息
router.post("/add",passwordMd5,authorization,isAdmin,adminValidotor.add,adminCtl.addAdmin);

// 管理员登陆
router.post("/login",passwordMd5,adminValidotor.login,adminCtl.loginAdmin);

// 获取登陆管理员个人信息
router.get("/myself",authorization,isAdmin,adminCtl.adminMyself);

module.exports = router;



