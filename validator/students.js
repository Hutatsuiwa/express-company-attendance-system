const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const studentModel = require('../model/students')

// 登陆参数验证
exports.login = [
    validate([
        body('login.username').notEmpty().withMessage("请传入用户名"),
        body('login.password').notEmpty().withMessage("请传入密码"),
        body('login.image').notEmpty().isBase64().withMessage("图片不是正确的Base64格式")
    ]),
    validate([
        body('login.username').custom(async (username,{req})=>{
            const isFind = await studentModel.findStudentByName(username)
            if(!isFind.length){
                return Promise.reject("该学员不存在")
            }
            req.body.login.userId = isFind[0].id
            console.log(req.body.login.userId)
        })
    ]),
    validate([
        body('login.password').custom(async (password,{req})=>{
            const result = await studentModel.validPassword(req.body.login.username)
            if(result !== password){
                return Promise.reject("密码不正确")
            }
        })
    ])
]

// 添加参数验证
exports.add = [
    validate([
        body('student.username').notEmpty().withMessage("请传入用户名"),
        body('student.password').notEmpty().withMessage("请传入密码"),
        body('student.image').notEmpty().isBase64().withMessage("图片不是正确的Base64格式")
    ]),
    validate([
        body('student.username').custom(async (username)=>{
            const result = await studentModel.findStudentByName(username)
            if(result.length){
                return Promise.reject("用户名已存在")
            }
        })
    ])
]

// 更新参数验证
exports.update = [
    validate([
        body('student.userId').notEmpty().withMessage("请传入用户ID"),
        body('student.username').notEmpty().withMessage("请传入新用户名"),
        body('student.password').notEmpty().withMessage("请传入新密码")
    ]),
    validate([
        body('student.userId').custom(async (userId)=>{
            const result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ]),
    validate([
        body('student.username').custom(async (username)=>{
            const result = await studentModel.findStudentByName(username)
            if(result.length){
                return Promise.reject("用户名已存在")
            }
        })
    ])
]

// 删除参数验证
exports.delete = [
    validate([
        param('userId').notEmpty().withMessage("请传入用户ID")
    ]),
    validate([
        param('userId').custom(async (userId)=>{
            const result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ])
]

// 查找参数验证
exports.find = [
    validate([
        param('username').notEmpty().withMessage("请传入用户名")
    ])
]