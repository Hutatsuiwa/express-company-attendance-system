const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const examinationModel = require('../model/examinations')
const studentModel = require('../model/students')
const questionModel = require('../model/questions')

// 添加参数验证-选择题
exports.choiceAdd = [
    validate([
        body("choice.content").notEmpty().withMessage("传入内容不能为空"),
        body("choice.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("choice.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("choice.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("choice.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("choice.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("choice.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 添加参数验证-判断题
exports.judgeAdd = [
    validate([
        body("judge.content").notEmpty().withMessage("传入内容不能为空"),
        body("judge.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("judge.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("judge.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("judge.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("judge.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("judge.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 添加参数验证-多选题
exports.multipleAdd = [
    validate([
        body("multiple.content").notEmpty().withMessage("传入内容不能为空"),
        body("multiple.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("multiple.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("multiple.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("multiple.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("multiple.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("multiple.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 修改参数验证-选择题
exports.choiceUpdate = [
    validate([
        body("choice.id").notEmpty().withMessage("传入题目ID不能为空"),
        body("choice.content").notEmpty().withMessage("传入内容不能为空"),
        body("choice.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("choice.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("choice.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("choice.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("choice.id").custom(async questionId=>{
            let result = await questionModel.findChoiceQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ]),
    validate([
        body("choice.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("choice.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 修改参数验证-判断题
exports.judgeUpdate = [
    validate([
        body("judge.id").notEmpty().withMessage("传入题目ID不能为空"),
        body("judge.content").notEmpty().withMessage("传入内容不能为空"),
        body("judge.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("judge.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("judge.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("judge.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("judge.id").custom(async questionId=>{
            let result = await questionModel.findJudgeQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ]),
    validate([
        body("judge.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("judge.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 修改参数验证-多选题
exports.multipleUpdate = [
    validate([
        body("multiple.id").notEmpty().withMessage("传入题目ID不能为空"),
        body("multiple.content").notEmpty().withMessage("传入内容不能为空"),
        body("multiple.options").notEmpty().withMessage("传入选项不能为空")
    ]),
    validate([
        body("multiple.options.*.key").notEmpty().withMessage("传入选项key不能为空"),
        body("multiple.options.*.content").notEmpty().withMessage("传入选项内容不能为空"),
        body("multiple.options.*.flag").notEmpty().withMessage("传入选项对错标识不能为空")
    ]),
    validate([
        body("multiple.id").custom(async questionId=>{
            let result = await questionModel.findMultipleQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ]),
    validate([
        body("multiple.options.*.key").custom((key,{req})=>{
            let num = 0
            for(let item of req.body.options){
                if(key === item.key) num++
            }
            if(num>1){
                return Promise.reject("不能有重复的key值")
            }
        }),
        body("multiple.options.*.flag").custom(flag=>{
            if(flag != 0 && flag != 1){
                return Promise.reject("flag值必须为0或1")
            }
        })
    ])
]

// 删除参数验证-选择题
exports.choiceDelete = [
    validate([
        param("questionId").notEmpty().withMessage("传入题目ID不能为空")
    ]),
    validate([
        param("questionId").custom(async questionId=>{
            let result = await questionModel.findChoiceQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ])
]

// 删除参数验证-判断题
exports.judgeDelete = [
    validate([
        param("questionId").notEmpty().withMessage("传入题目ID不能为空")
    ]),
    validate([
        param("questionId").custom(async questionId=>{
            let result = await questionModel.findJudgeQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ])
]

// 删除参数验证-多选题
exports.mutipleDelete = [
    validate([
        param("questionId").notEmpty().withMessage("传入题目ID不能为空")
    ]),
    validate([
        param("questionId").custom(async questionId=>{
            let result = await questionModel.findMultipleQuestionId(questionId)
            if(!result.length){
                return Promise.reject("题库中没有该题目")
            }
        })
    ])
]

// 获取参数验证-学生课程
exports.findUserCourse = [
    validate([
        param("userId").notEmpty().withMessage("传入学生ID不能为空"),
        param("courseId").notEmpty().withMessage("传入课程ID不能为空")
    ]),
    validate([
        param("userId").custom(async userId=>{
            let result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学生不存在")
            }
        }),
        param("courseId").custom(async courseId=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该课程不存在")
            }
        })
    ])
]

// 获取参数验证-考试
exports.findExamination = [
    validate([
        param("examinationId").notEmpty().withMessage("传入考试ID不能为空"),
    ]),
    validate([
        param("examinationId").custom(async examinationId=>{
            let result = await examinationModel.findExaminationById(examinationId)
            if(!result.length){
                return Promise.reject("该场考试不存在")
            }
        })
    ])
]

// 提交参数验证
exports.submit = [
    validate([
        body("userId").notEmpty().withMessage("传入学员ID不能为空"),
        body("examinationId").notEmpty().withMessage("传入考试ID不能为空"),
        body("answer").notEmpty().withMessage("传入答案不能为空")
    ]),
    validate([
        param("userId").custom(async userId=>{
            let result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学生不存在")
            }
        }),
        body("examinationId").custom(async examinationId=>{
            let result = await examinationModel.findExaminationById(examinationId)
            if(!result.length){
                return Promise.reject("该场考试不存在")
            }
        })
    ])
]