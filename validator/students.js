const validate = require('../middleware/validate');
const { body } = require('express-validator');
const studentModel = require('../model/students')

exports.login = [
    validate([
        body('login.username').notEmpty().withMessage("未输入用户名"),
        body('login.password').notEmpty().withMessage("未输入密码"),
        body('login.image').notEmpty().isBase64().withMessage("图片不是正确的Base64格式")
    ]),
    validate([
        body('login.username').custom(async (username,{req})=>{
            const isFind = await studentModel.findStudent(username)
            if(!isFind.length){
                return Promise.reject("用户不存在")
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

exports.add = [
    validate([
        body('student.username').notEmpty().withMessage("未输入用户名"),
        body('student.password').notEmpty().withMessage("未输入密码"),
        body('student.image').notEmpty().isBase64().withMessage("图片不是正确的Base64格式")
    ])
]