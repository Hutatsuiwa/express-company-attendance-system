const express = require('express');
const router = express.Router();

const userCtl = require('../controller/users');

const userValidotor = require('../validator/users');

const authorization = require('../middleware/authorization');

/* 用户路由 */

//查询所有用户
router.get('/search/all', userCtl.getAllUsers);

//查询单个用户
router.get('/search/:id', authorization, userCtl.getUserById);

//添加用户
router.post('/add', userCtl.addUser);

//更新用户
router.post('/update', userCtl.updateUser);

//删除用户
router.delete('/delete/:id', userCtl.deleteUser);

//用户登录
router.post('/login',userCtl.loginUser);

//用户注册
router.post('/register',userValidotor.register,userCtl.registerUser)

module.exports = router;
