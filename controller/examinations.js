const examinationModel = require('../model/examinations')

// 获取所有考试信息
exports.getAllExaminations = async (req,res,next)=>{
    try{
        let result = await examinationModel.getAllExaminations();
        res.status(200).json({
            examinations:result
        })
    }catch(err){
        err.status = 400;
        err.message = "获取失败";
        next(err);
    }
}

// 获取学员能够预约的考试信息
exports.getExaminationByUsername = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationByUsername(req.params.username);
        res.status(200).json({
            examinations:result
        })
    }catch(err){
        err.status = 400;
        err.message = "获取失败";
        next(err);
    }
}

// 获取学员已预约/完成的考试信息
exports.getExaminationDoing = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationDoing(req.params.username);
        res.status(200).json({
            examinationDetail:result
        })
    }catch(err){
        err.status = 400;
        err.message = "获取失败";
        next(err);
    }
}

// 获取特定科目的考试信息
exports.getExaminationByCourseName = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationByCourseName(req.params.courseName);
        res.status(200).json({
            examinations:result
        })
    }catch(err){
        err.status = 400;
        err.message = "获取失败";
        next(err);
    }
}

// 获取特定时间段内的特定科目的考试信息
exports.getExaminationByCourseTime = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationByCourseTime(req.params.courseName,req.params.startTime,req.params.endTime);
        res.status(200).json({
            examinations:result
        })
    }catch(err){
        err.status = 400;
        err.message = "获取失败";
        next(err);
    }
}

// 添加考试信息
exports.addExamination = async (req,res,next)=>{
    try{
        await examinationModel.addExamination(req.body.examination);
        res.status(204).end();
    }catch(err){
        err.status = 400;
        err.message = "添加失败";
        next(err);
    }
}

// 删除考试信息
exports.deleteExamination = async (req,res,next)=>{
    try{
        await examinationModel.deleteExamination(req.params.examinationId);
        res.status(204).end();
    }catch(err){
        err.status = 400;
        err.message = "删除失败";
        next(err);
    }
}

// 修改考试信息
exports.updateExamination = async (req,res,next)=>{
    try{
        await examinationModel.updateExamination(req.body.examination);
        res.status(204).end();
    }catch(err){
        err.status = 400;
        err.message = "修改失败";
        next(err);
    }
}

// 预约考试
exports.reservationExamination = async (req,res,next)=>{
    try{
        await examinationModel.reservationExamination(req.body.reservation);
        res.status(204).end();
    }catch(err){
        err.status = 400;
        err.message = "预约失败";
        next(err);
    }
}

// 结束考试
exports.closeExamination = async (req,res,next)=>{
    try{
        await examinationModel.closeExamination(req.body.examinationId);
        res.status(204).end();
    }catch(err){
        err.status = 400;
        err.message = "结束失败";
        next(err);
    }
}
