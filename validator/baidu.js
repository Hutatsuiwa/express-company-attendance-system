const validate = require('../middleware/validate');
const { body } = require('express-validator');

exports.image = validate([
    body('user.image').isBase64().withMessage("图片不是正确的Base64格式")
])