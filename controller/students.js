const jwt = require("../utils/jwt")
const { jwtSecret } = require("../config/config_default")
const studentModel = require('../model/students')
const baiduFace = require('../utils/baidu')

// 获取所有学员信息
exports.getAllStudents = async (req,res,next)=>{
    try{
        // 调用sql方法
        let result = await studentModel.getAllStudents();
        res.status(200).json({
            students:result
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

// 通过用户名获取学员信息
exports.getStudentByName = async (req,res,next)=>{
    try{
        let result = await studentModel.getStudentByName(req.params.username);
        res.status(200).json({
            student:result
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

// 添加学员信息
exports.addStudent = async (req,res,next)=>{
    try{
        await studentModel.addStudent(req.student);
        // 插入成功后，从数据库中取出userId
        const studentUserId = await studentModel.findStudentByName(req.body.student.username)[0].id
        const studentImage = req.body.student.image
        // 检测人脸质量后再注册人脸
        await baiduFace.cheackFace(studentImage)
        await baiduFace.registerFace(studentImage,studentUserId)
        res.status(204).end();
    }catch(err){
        err.status = err.status ? err.status : 400;
        err.message = err.message ? err.message : "添加失败";
        next(err);
    }
}

// 修改学员信息
exports.updateStudent = async (req,res,next)=>{
    try{
        await studentModel.updateStudent(req.body.student);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "更新失败";
        next(err);
    }
}

// 通过用户ID删除学员信息
exports.deleteStudent = async (req,res,next)=>{
    try{
        await studentModel.deleteStudent(req.params.userId);
        await baiduFace.deleteFaceUser(req.params.userId)
        res.status(204).end();
    }catch(err){
        err.status = err.status ? err.status : 400;
        err.message = err.message ? err.message : "删除失败";
        next(err);
    }
}

// 学员登陆
exports.loginStudent = async (req,res,next)=>{
    try{
        // 验证人脸
        if(await baiduFace.matchFace(req.body.login.image,req.body.login.userId)<90){
            let err = {}
            err.message = "人脸信息不匹配"
            err.status = 400
            throw err
        }
        // 签发token
        let token = await jwt.sign({
            username:req.body.login.username
        },jwtSecret,{
            expiresIn: 60 * 60 * 24 * 30 //持续时间
        });
        res.status(200).json({
            userType:"student",
            token:token
        })
    }catch(err){
        err.message = err.message ? err.message : "登录失败";
        next(err);
    }
}

// 获取已登陆学员的个人信息
exports.studentMyself = async (req,res,next)=>{
    try{
        let result = await studentModel.studentMyself(req.username);
        res.status(200).json({
            student:result
        })
    }catch(err){
        err.message = "获取失败";
        next(err);
    }
}
