const scoreModel = require("../model/scores");

// 通过科目类型获取所有学员成绩
exports.getScoreByCourse = async (req,res,next)=>{
    try{
        let result = await scoreModel.getScoreByCourse(req.params.courseId)
        res.status(200).json({
            scores:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 通过学员名和科目类型获取学员成绩
exports.getScoreByUserCourse = async (req,res,next)=>{
    try{
        let result = await scoreModel.getScoreByUserCourse(req.params.userId,req.params.courseId)
        res.status(200).json({
            score:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 通过科目类型和分数限制获取所有学员成绩
exports.getScoreByCourseLarge = async (req,res,next)=>{
    try{
        let result = await scoreModel.getScoreByCourseLarge(req.params.courseId,req.params.largerThen)
        res.status(200).json({
            scores:result
        })
    }catch(err){
        err.status = 400
        err.message = "获取失败"
        next(err)
    }
}

// 修改学员成绩
exports.updateScore = async (req,res,next)=>{
    try{
        await scoreModel.updateScore(req.body.score)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "修改失败"
        next(err)
    }
}

// 删除学员成绩
exports.deleteScore = async (req,res,next)=>{
    try{
        await scoreModel.deleteScore(req.params.userId,req.params.courseId)
        res.status(204).end()
    }catch(err){
        err.status = 400
        err.message = "删除失败"
        next(err)
    }
}
