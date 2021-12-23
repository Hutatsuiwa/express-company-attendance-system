const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const studentModel = require('../model/students')
const auditModel = require('../model/audits')

// 注册参数验证
exports.register = [
    validate([
        body('student.username').notEmpty().withMessage("请传入用户名"),
        body('student.password').notEmpty().withMessage("请传入密码"),
        body('student.imageBase64').notEmpty().isBase64().withMessage("图片不是正确的Base64格式"),
        body('student.identityNumber').notEmpty().withMessage("请传入身份证号")
    ]),
    validate([
        body('student.username').custom(async (username)=>{
            const isFind = await studentModel.findStudentByName(username)
            if(isFind.length){
                return Promise.reject("该用户名已存在")
            }
        }),
        body('student.identityNumber').custom(async (identityNumber)=>{
            const isFind = await studentModel.findStudentByIdentity(identityNumber)
            if(isFind.length){
                return Promise.reject("该身份证号已存在")
            }
        })
    ]),
    validate([
        body('student.username').custom(async (username)=>{
            const isFind = await auditModel.findStudentByName(username)
            if(isFind.length){
                return Promise.reject("该用户名正在审核中")
            }
        }),
        body('student.identityNumber').custom(async (identityNumber)=>{
            const isFind = await auditModel.findStudentByIdentity(identityNumber)
            if(isFind.length){
                return Promise.reject("该身份证号正在审核中")
            }
        })
    ])
]

// 拒绝通过参数验证
exports.delete = [
    validate([
        param('username').notEmpty().withMessage("请传入用户名")
    ]),
    validate([
        param('username').custom(async (username)=>{
            const result = await auditModel.findStudentByName(username)
            if(!result.length){
                return Promise.reject("该用户名不存在")
            }
        })
    ])
]

// 查询状态参数验证
exports.stauts = [
    validate([
        param('identityNumber').notEmpty().withMessage("请传入身份证号")
    ])
]