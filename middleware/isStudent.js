const studentModel = require('../model/students')

module.exports = async (req,res,next)=>{
    try{
        const result = await studentModel.findStudentByName(req.username)
        if(!result.length){
            let err
            throw err
        }
        next();
    }catch(err){
        err.status = 401
        err.message = "您的身份并非学生"
        next(err)
    }
}