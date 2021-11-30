const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const adminModel = require('../model/admins')

// 登陆参数验证
exports.login = [
    validate([
        body('login.username').notEmpty().withMessage("请传入用户名"),
        body('login.password').notEmpty().withMessage("请传入密码")
    ]),
    validate([
        body('login.username').custom(async username=>{
            const isFind = await adminModel.findAdminByName(username)
            if(!isFind.length){
                return Promise.reject("该管理员不存在")
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

// 更新参数验证
exports.update = [
    validate([
        body('admin.userId').notEmpty().withMessage("请传入用户ID"),
        body('admin.username').notEmpty().withMessage("请传入新用户名"),
        body('admin.password').notEmpty().withMessage("请传入新密码")
    ]),
    validate([
        body('admin.userId').custom(async (userId)=>{
            const result = await adminModel.findAdminById(userId)
            if(!result.length){
                return Promise.reject("该管理员不存在")
            }
        })
    ]),
    validate([
        body('admin.username').custom(async (username)=>{
            const result = await adminModel.findAdminByName(username)
            if(result.length){
                return Promise.reject("用户名已存在")
            }
        })
    ])
]

// 添加参数验证
exports.add = [
    validate([
        body('admin.username').notEmpty().withMessage("请传入用户名"),
        body('admin.password').notEmpty().withMessage("请传入密码")
    ]),
    validate([
        body('admin.username').custom(async (username)=>{
            const result = await adminModel.findAdminByName(username)
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
            const result = await adminModel.findAdminById(userId)
            if(!result.length){
                return Promise.reject("该管理员不存在")
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