const express = require('express');
const router = express.Router();

const studnetCtl = require('../controller/students')

// 获取所有学员信息
router.get('/search/all',studnetCtl.getAllStudents);

// 通过用户名获取学员信息
router.get('/search/:username',studnetCtl.getStudentByName);

// 添加学员信息
router.post('/add',studnetCtl.addStudent);

// 修改学员信息
router.put('/update',studnetCtl.updateStudent);

// 通过用户名删除学员信息
router.delete('/delete/:username',studnetCtl.deleteStudent);

// 学员登录
router.post('/login',studnetCtl.loginStudent);

// 获取已登陆学员的个人信息
router.get('/myroom',studnetCtl.studentMyself);

module.exports = router;