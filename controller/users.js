const jwt = require("../utils/jwt")
const { jwtSecret } = require("../config/config_default")
const userModel = require('../model/user')
const { HttpClient } = require("baidu-aip-sdk")

//获取全部用户信息
exports.getAllUsers = async (req,res,next)=>{
    try{
        res.status(200).json({
            result:"true"
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

//获取单个用户信息
exports.getUserById = async (req,res,next)=>{
    try{
        let result = await userModel.getUserByName(req.userName)
        res.status(200).json({
            result:"true",
            user:result
            // user:{
            //     userId:"userId",
            //     username:"username",
            //     createTime:"creatTime",
            //     userStates:[{
            //         subject:"subject1",
            //         exminationState:"failed",
            //         exminationDetail:{
            //             room:"1",
            //             startTime:"11:11:00",
            //             endTime:"12:12:00"
            //         }
            //     },
            //     {
            //         subject:"subject4",
            //         exminationState:"failed",
            //         exminationDetail:{
            //             room:"1",
            //             startTime:"11:11:00",
            //             endTime:"12:12:00"
            //         },
                    
            //     }
            // ]}
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

//添加用户
exports.addUser = async (req,res,next)=>{
    try{
        res.status(200).json({
            result:"true",
            userId:"userId"
        })
    }catch(err){
        err.status=400;
        err.message = "添加失败";
        next(err);
    }
}

//更新用户
exports.updateUser = async (req,res,next)=>{
    try{
        res.status(200).json({
            result:"true",
            userId:"userId"
        })
    }catch(err){
        err.status=400;
        err.message = "更新失败";
        next(err);
    }
}

//删除用户
exports.deleteUser = async (req,res,next)=>{
    try{
        res.status(200).json({
            result:"true",
            userId:"userId"
        })
    }catch(err){
        err.status=400;
        err.message = "删除失败";
        next(err);
    }
}

//登录用户
exports.loginUser = async (req,res,next)=>{
    try{
        //签发token
        let token = await jwt.sign({
            username:req.body.user.username
        },jwtSecret,{
            expiresIn: 60 * 60 * 24 * 30 //持续时间
        });

        res.status(200).json({
            result:"true",
            userId:"userId",
            userClass:"student",
            token:token
        })
    }catch(err){
        console.log(err);
        err.message = "登录失败";
        next(err);
    }
}

//注册用户
exports.registerUser = async (req,res,next)=>{
    try{
        res.status(200).json({
            result:"true",
            userId:"userId",
            username:"username"
        })
    }catch(err){
        err.status=400;
        err.message = "注册失败";
        next(err);
    }
}

