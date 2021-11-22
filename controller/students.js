const jwt = require("../utils/jwt")
const { jwtSecret } = require("../config/config_default")
const studentModel = require('../model/students')

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
        await studentModel.addStundet(req.student);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "添加失败";
        next(err);
    }
}

// 修改学员信息
exports.updateStudent = async (req,res,next)=>{
    try{
        await studentModel.updateStundet(req.student);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "更新失败";
        next(err);
    }
}

// 通过用户名删除学员信息
exports.deleteStudent = async (req,res,next)=>{
    try{
        await studentModel.deleteStundet(req.params.username);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "删除失败";
        next(err);
    }
}

// 学员登陆
exports.loginStudent = async (req,res,next)=>{
    try{
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
        err.message = "登录失败";
        next(err);
    }
}

// 获取已登陆学员的个人信息
exports.studentMyself = async (req,res,next)=>{
    try{
        let resutl = await studentModel.getMyself(req.username);
        res.status(200).json({
            student:result
        })
    }catch(err){
        err.message = "获取失败";
        next(err);
    }
}
