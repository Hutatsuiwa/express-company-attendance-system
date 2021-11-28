const adminModel = require('../model/admins')

module.exports = async (req,res,next)=>{
    try{
        const result = await adminModel.findAdmin(req.username)
        if(!result.length){
            let err = {}
            throw err
        }
        next();
    }catch(err){
        err.status = 401
        err.message = "您的身份并非管理员"
        next(err)
    }
}