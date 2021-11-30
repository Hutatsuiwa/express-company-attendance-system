const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const examinationModel = require('../model/examinations')
const studentModel = require('../model/students')

// 查找参数验证-科目
exports.findCourseId = [
    validate([
        param('courseId').notEmpty().withMessage("请传入科目ID"),
    ]),
    validate([
        param('courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ])
]

// 查找参数验证-科目、学员限制
exports.findUserCourse = [
    validate([
        param('userId').notEmpty().withMessage("请传入学员ID"),
        param('courseId').notEmpty().withMessage("请传科目ID")
    ]),
    validate([
        param('userId').custom(async (userId)=>{
            const result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ]),
    validate([
        param('courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ])
] 

// 查找参数验证-科目、分数限制
exports.findCourseLimit= [
    validate([
        param('courseId').notEmpty().withMessage("请传入科目ID"),
        param('largerThen').notEmpty().withMessage("请传入限制值"),
    ]),
    validate([
        param('courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ])
]   

// 删除参数验证
exports.delete = [
    validate([
        body('scores.userId').notEmpty().withMessage("请传入学员ID"),
        body('scores.courseId').notEmpty().withMessage("请传科目ID")
    ]),
    validate([
        body('scores.userId').custom(async (userId)=>{
            const result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ]),
    validate([
        body('scores.courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ])
]

// 修改参数验证
exports.update = [
    validate([
        body('scores.userId').notEmpty().withMessage("请传入学员ID"),
        body('scores.courseId').notEmpty().withMessage("请传科目ID"),
        body('scores.score').notEmpty().withMessage("请传入分数"),
    ]),
    validate([
        body('scores.userId').custom(async (userId)=>{
            const result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ]),
    validate([
        body('scores.courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ]),
    validate([
        body('scores.score').custom((score)=>{
            if(score>100||score<0){
                return Promise.reject("分数设置不合法")
            }
        })
    ])
]