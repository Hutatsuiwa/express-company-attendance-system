const md5 = require("../utils/md5")

module.exports = (req,res,next)=>{
    // console.log(req.body.login.password)
    req.body.login.password = req.body.login.password ? md5(req.body.login.password) : null
    // console.log(req.body.login.password)
    next();
}