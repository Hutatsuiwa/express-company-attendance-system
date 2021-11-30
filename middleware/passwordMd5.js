const md5 = require("../utils/md5")

module.exports = (req,res,next)=>{
    // console.log(req.body.login.password)
    if(req.body.login) req.body.login.password = req.body.login.password ? md5(req.body.login.password) : null
    if(req.body.student) req.body.student.password = req.body.student.password ? md5(req.body.student.password) : null
    if(req.body.admin) req.body.admin.password = req.body.admin.password ? md5(req.body.admin.password) : null
    // console.log(req.body.login.password)
    next();
}