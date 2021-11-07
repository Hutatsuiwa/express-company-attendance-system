const crpyto = require("crypto");
const { SALT } = require("../config/config_default");

//密码加密
module.exports = str =>{
    return crpyto.createHash('md5')
    .update(SALT+str)
    .digest('hex')
}