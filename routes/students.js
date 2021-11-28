const express = require('express');
const router = express.Router();

const studnetCtl = require('../controller/students')

const passwordMd5 =require('../middleware/passwordMd5')

//输入数据检测、验证
const studentValidotor = require('../validator/students');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
const isStudnet = require('../middleware/isStudent')

// 获取所有学员信息
router.get('/search/all',authorization,isAdmin,studnetCtl.getAllStudents);

// 通过用户名获取学员信息
router.get('/search/:username',authorization,isAdmin,studnetCtl.getStudentByName);

// 添加学员信息
router.post('/add',authorization,isAdmin,studnetCtl.addStudent);

// 修改学员信息
router.put('/update',authorization,isAdmin,studnetCtl.updateStudent);

// 通过用户名删除学员信息
router.delete('/delete/:username',authorization,isAdmin,studnetCtl.deleteStudent);

// 学员登录
router.post('/login',passwordMd5,studentValidotor.login,studnetCtl.loginStudent);

// 获取已登陆学员的个人信息
router.get('/myself',authorization,isStudnet,studnetCtl.studentMyself);

module.exports = router;