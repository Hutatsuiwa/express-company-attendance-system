const express = require('express');
const router = express.Router();

const auditCtl = require('../controller/audits');

//imageBase64格式修正
const imageFormat = require('../middleware/imageFormat')

//输入数据检测、验证
const auditValidotor = require('../validator/audits');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')

// 提交注册信息
router.post("/register",imageFormat,auditValidotor.register,auditCtl.register)

// 获取待审核列表
router.get("/list",authorization,isAdmin,auditCtl.getList)

// 拒绝通过
router.delete("/reject/:username",auditValidotor.delete,authorization,isAdmin,auditCtl.reject);

// 查询审核状态
router.get("/status/:identityNumber",auditValidotor.stauts,auditCtl.getStatus)

module.exports = router;