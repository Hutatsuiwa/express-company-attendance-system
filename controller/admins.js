const jwt = require("../utils/jwt")
const { jwtSecret } = require("../config/config_default")
const adminModel = require('../model/admins')

// 获取所有管理员信息
exports.getAllAdmins = async (req,res,next)=>{
    try{
        // 调用sql方法
        let result = await adminModel.getAllAdmins();
        res.status(200).json({
            admins:result
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

// 通过用户名获取管理员信息
exports.getAdminByName = async (req,res,next)=>{
    try{
        let result = await adminModel.getAdminByName(req.params.username);
        res.status(200).json({
            admin:result
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

// 添加管理员信息
exports.addAdmin = async (req,res,next)=>{
    try{
        await adminModel.addAdmin(req.admin);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "添加失败";
        next(err);
    }
}

// 修改管理员信息
exports.updateAdmin = async (req,res,next)=>{
    try{
        await adminModel.updateAdmin(req.admin);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "更新失败";
        next(err);
    }
}

// 通过用户名删除管理员信息
exports.deleteAdmin = async (req,res,next)=>{
    try{
        await adminModel.deleteAdmin(req.params.username);
        res.status(204).end();
    }catch(err){
        err.status=400;
        err.message = "删除失败";
        next(err);
    }
}

// 管理员登陆
exports.loginAdmin = async (req,res,next)=>{
    try{
        // 签发token
        let token = await jwt.sign({
            username:req.body.login.username
        },jwtSecret,{
            expiresIn: 60 * 60 * 24 * 30 //持续时间
        });
        res.status(200).json({
            userType:"admin",
            token:token
        })
    }catch(err){
        err.message = "登录失败";
        next(err);
    }
}

// 获取已登陆管理员的个人信息
exports.adminMyself = async (req,res,next)=>{
    try{
        let resutl = await adminModel.getMyself(req.username);
        res.status(200).json({
            admin:resutl
        })
    }catch(err){
        err.message = "获取失败";
        next(err);
    }
}
