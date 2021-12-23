const studentModel = require('../model/students')
const auditModel = require('../model/audits')

// 提交注册信息
exports.register = async (req,res,next)=>{
    try{
        // 调用sql方法
        await auditModel.register(req.body.student);
        res.status(204).end()
    }catch(err){
        err.status=400;
        err.message = "提交失败";
        next(err);
    }
}

// 获取待审核列表
exports.getList = async (req,res,next)=>{
    try{
        // 调用sql方法
        let result = await auditModel.getList();
        res.status(200).json({
            students:result
        })
    }catch(err){
        err.status=400;
        err.message = "获取失败";
        next(err);
    }
}

// 拒绝通过
exports.reject = async (req,res,next)=>{
    try{
        // 调用sql方法
        await auditModel.reject(req.params.username);
        res.status(204).end()
    }catch(err){
        err.status=400;
        err.message = "拒绝失败";
        next(err);
    }
}

// 查询审核状态
exports.getStatus = async (req,res,next)=>{
    try{
        // 调用sql方法
        let result = await auditModel.getStatus(req.params.identityNumber);
        res.status(200).json({
            status:result
        })
    }catch(err){
        err.status=400;
        err.message = "查询失败";
        next(err);
    }
}

