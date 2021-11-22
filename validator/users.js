const validate = require('../middleware/validate');
const { body } = require('express-validator');
const userModel = require('../model/user')

exports.register = validate([
    body('user.username').notEmpty().withMessage("用户名不能为空"),

    body('user.password').notEmpty().withMessage("密码不能为空")
])

exports.login = validate([
    body('user.username')
    .notEmpty().withMessage("用户名不能为空")
    .bail()
    .custom(async value=>{
        let result = await userModel.findUser(value)

        console.log(result);
        if(!result){
            return Promise.reject("用户不存在");
        }
    }),

    body('user.password').notEmpty().withMessage("密码不能为空")
])
