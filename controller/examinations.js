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
exports.getExaminationByUserId = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationByUserId(req.params.userId);
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
        let result = await examinationModel.getExaminationDoing(req.params.userId);
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
exports.getExaminationByCourseId = async (req,res,next)=>{
    try{
        let result = await examinationModel.getExaminationByCourseId(req.params.courseId);
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
        let result = await examinationModel.getExaminationByCourseTime(req.params.courseId,req.params.startTime,req.params.endTime);
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
        // 自动开始考试
        const startTimeoutId = setTimeout(async () => {
            await examinationModel.startExamination()
        }, req.body.examination.startTime*1 - Date.now());
        // 自动结束考试
        const closeTimeoutId = setTimeout(async () => {
            await examinationModel.closeExamination()
        }, req.body.examination.startTime*1 + 2700000);
        // 将定时器放入examination中
        req.body.examination.startTimeoutId = Number(startTimeoutId)
        req.body.examination.closeTimeoutId = Number(closeTimeoutId)
        await examinationModel.addExamination(req.body.examination);
        res.status(204).end();
    }catch(err){
        console.log(err)
        err.status = 400;
        err.message = "添加失败";
        next(err);
    }
}

// 删除考试信息
exports.deleteExamination = async (req,res,next)=>{
    try{
        // 拿到定时器Id
        let TimeoutId = await examinationModel.findTimeoutId(req.params.examinationId)
        console.log(TimeoutId)
        // 关闭定时器
        clearTimeout(TimeoutId[0].startTimeoutId)
        clearTimeout(TimeoutId[0].closeTimeoutId)
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
        // 拿到定时器Id
        let TimeoutId = await examinationModel.findTimeoutId(req.body.examination.examinationId)
        // 关闭定时器
        clearTimeout(TimeoutId[0].startTimeoutId)
        clearTimeout(TimeoutId[0].closeTimeoutId)
        // 设置新开始定时器
        const startTimeoutId = setTimeout(async () => {
            await examinationModel.startExamination()
        }, req.body.examination.startTime*1 - Date.now());
        // 设置新结束定时器
        const closeTimeoutId = setTimeout(async () => {
            await examinationModel.closeExamination()
        }, req.body.examination.startTime*1 + 2700000);
        // 将定时器放入examination中
        examination.startTimeoutId = Number(startTimeoutId)
        examination.closeTimeoutId = Number(closeTimeoutId)
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


