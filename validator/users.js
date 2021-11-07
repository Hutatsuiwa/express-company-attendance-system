const validate = require('../middleware/validate');
const { body } = require('express-validator');

exports.register = validate([
    body('user.username').notEmpty().withMessage("用户名不能为空"),

    body('user.password').notEmpty().withMessage("密码不能为空"),

    body('user.image').isBase64().withMessage("图片不是正确的Base64格式")
])

exports.login = validate([
    body('user.username').notEmpty().withMessage("用户名不能为空"),

    body('user.password').notEmpty().withMessage("密码不能为空"),

    body('user.image').isBase64().withMessage("图片不是正确的Base64格式")
])