const validate = require('../middleware/validate');
const { body } = require('express-validator');
const adminModel = require('../model/admins')

exports.login = [
    validate([
        body('login.username').notEmpty().withMessage("未输入用户名"),
        body('login.password').notEmpty().withMessage("未输入密码")
    ]),
    validate([
        body('login.username').custom(async username=>{
            const isFind = await adminModel.findAdmin(username)
            if(!isFind.length){
                return Promise.reject("用户不存在")
            }
        })
    ]),
    validate([
        body('login.password').custom(async (password,{req})=>{
            const result = await adminModel.validPassword(req.body.login.username)
            if(result !== password){
                return Promise.reject("密码不正确")
            }
        })
    ])
]

// exports.update = [
//     validate([
//         body('admin.username').notEmpty().withMessage("请传入原用户名"),
//         body('admin.newName').notEmpty().withMessage("请传入新用户名"),
//         body('admin.password').notEmpty().withMessage("请传入新密码")
//     ]),
//     validate([
//         body('admin.username').custom(async (username)=>{
//             const result = await adminModel.findAdmin(username)
//             if(!result.length){
//                 return Promise.reject("不存在该用户")
//             }
//         })
//     ])
// ]