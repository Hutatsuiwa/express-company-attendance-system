const questionModel = require('../model/questions');

// 获取所有选择题
exports.getChoiceQuestion = async (req,res,next)=>{
    try{
        let result = await questionModel.getChoiceQuestion();
        res.status(200).json({
            choices:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 获取所有判断题
exports.getJudgeQuestion = async (req,res,next)=>{
    try{
        let result = await questionModel.getJudgeQuestion()
        res.status(200).json({
            judges:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 获取所有多选题
exports.getMultipleQuestion = async (req,res,next)=>{
    try{
        let result = await questionModel.getMultipleQuestion()
        res.status(200).json({
            multiples:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 添加选择题
exports.addChoiceQuestion = async (req,res,next)=>{
    try{
        await questionModel.addChoiceQuestion(req.body.choice)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "添加失败"
        next(err)
    }
}

// 添加判断题
exports.addJudgeQuestion = async (req,res,next)=>{
    try{
        await questionModel.addJudgeQuestion(req.body.judge)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "添加失败"
        next(err)
    }
}

// 添加多选题
exports.addMultipleQuestion = async (req,res,next)=>{
    try{
        await questionModel.addMultipleQuestion(req.body.multiple)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "添加失败"
        next(err)
    }
}

// 修改选择题
exports.updateChoiceQuestion = async (req,res,next)=>{
    try{
        await questionModel.updateChoiceQuestion(req.body.choices)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "修改失败"
        next(err)
    }
}

// 修改判断题
exports.updateJudgeQuestion = async (req,res,next)=>{
    try{
        await questionModel.updateJudgeQuestion(req.body.judge)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "修改失败"
        next(err)
    }
}

// 修改多选题
exports.updateMultipleQuestion = async (req,res,next)=>{
    try{
        await questionModel.updateMultipleQuestion(req.body.multiple)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "修改失败"
        next(err)
    }
}

// 删除选择题
exports.deleteChoiceQuestion = async (req,res,next)=>{
    try{
        await questionModel.deleteChoiceQuestion(req.params.questionId)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "删除失败"
        next(err)
    }
}

// 删除判断题
exports.deleteJudgeQuestion = async (req,res,next)=>{
    try{
        await questionModel.deleteJudgeQuestion(req.params.questionId)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "删除失败"
        next(err)
    }
}

// 删除多选题
exports.deleteMultipleQuestion = async (req,res,next)=>{
    try{
        await questionModel.deleteMultipleQuestion(req.params.questionId)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "删除失败"
        next(err)
    }
}

// 通过用户名和科目类型获取试卷
exports.getPaperByUserCourse = async (req,res,next)=>{
    try{
        let result = await questionModel.getPaperByUserCourse(req.params.username,req.params.courseId)
        res.status(200).json({
            questions:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 生成试卷
exports.getPaper = async (req,res,next)=>{
    try{
        let result = await questionModel.getPaper()
        res.status(200).json({
            questions:result
        })
    }catch(err){
        err.status = 400
        err.message = "生成失败"
        next(err)
    }
}

// 提交答案
exports.submitAnswer = async (req,res,next)=>{
    try{
        await questionModel.submitAnswer(req.body.submit)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "提交失败"
        next(err)
    }
}
