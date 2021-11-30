const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const examinationModel = require('../model/examinations')
const studentModel = require('../model/students')
const roomModel = require('../model/rooms')

// 查找参数验证-userId
exports.findUserId = [
    validate([
        param('userId').notEmpty().withMessage("请传入用户ID")
    ]),
    validate([
        param('userId').custom(async (userId)=>{
            let result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ])
]

// 查找参数验证-courseId
exports.findCourseId = [
    validate([
        param('courseId').notEmpty().withMessage("请传入科目ID")
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

// 查找参数验证-courseId、startTime、endTime
exports.findCourseIdTime = [
    validate([
        param('courseId').notEmpty().withMessage("请传入科目ID"),
        param('startTime').notEmpty().withMessage("请传入开始时间"),
        param('endTime').notEmpty().withMessage("请传入结束时间")
    ]),
    validate([
        param('courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ]),
    validate([
        param('startTime').custom(async (startTime,{req})=>{
            if(Number(req.params.endTime)<Number(startTime)){
                return Promise.reject("开始时间需要小于结束时间")
            }
        })
    ])
]

// 添加参数验证
exports.add = [
    validate([
        body('examination.roomId').notEmpty().withMessage("请传入考场ID"),
        body('examination.courseId').notEmpty().withMessage("请传入科目ID"),
        body('examination.startTime').notEmpty().withMessage("请传入开始时间"),
    ]),
    validate([
        body('examination.roomId').custom(async (roomId)=>{
            let result = await roomModel.findRoomById(roomId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ]),
    validate([
        body('examination.courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ]),
    validate([
        body('examination.startTime').custom(async (startTime)=>{
            if(startTime<Date.now()){
                return Promise.reject("开始时间设置过早")
            }
        })
    ])
]

// 删除参数验证
exports.delete = [
    validate([
        param('examinationId').notEmpty().withMessage("请传入考试ID")
    ]),
    validate([
        param('examinationId').custom(async (examinationId)=>{
            let result = await examinationModel.findExaminationById(examinationId)
            if(!result.length){
                return Promise.reject("该场考试不存在")
            }
        })
    ])
]

// 修改参数验证
exports.update = [
    validate([
        body('examination.examinationId').notEmpty().withMessage("请传入考试ID"),
        body('examination.roomId').notEmpty().withMessage("请传入考场ID"),
        body('examination.courseId').notEmpty().withMessage("请传入科目ID"),
        body('examination.startTime').notEmpty().withMessage("请传入开始时间"),
    ]),
    validate([
        body('examination.examinationId').custom(async (examinationId)=>{
            let result = await examinationModel.findExaminationById(examinationId)
            if(!result.length){
                return Promise.reject("该场考试不存在")
            }
        })
    ]),
    validate([
        body('examination.roomId').custom(async (roomId)=>{
            let result = await roomModel.findRoomById(roomId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ]),
    validate([
        body('examination.courseId').custom(async (courseId)=>{
            let result = await examinationModel.findCourseById(courseId)
            if(!result.length){
                return Promise.reject("该科目不存在")
            }
        })
    ]),
    validate([
        body('examination.startTime').custom(async (startTime)=>{
            if(startTime<Date.now()){
                return Promise.reject("开始时间设置过早")
            }
        })
    ])
]

// 预约考试参数验证
exports.reservation = [
    validate([
        body('reservation.userId').notEmpty().withMessage("请传入用户ID"),
        body('reservation.examinationId').notEmpty().withMessage("请传入考试ID")
    ]),
    validate([
        body('reservation.userId').custom(async (userId)=>{
            let result = await studentModel.findStudentById(userId)
            if(!result.length){
                return Promise.reject("该学员不存在")
            }
        })
    ]),
    validate([
        body('reservation.examinationId').custom(async (examinationId)=>{
            let result = await examinationModel.findExaminationById(examinationId)
            if(!result.length){
                return Promise.reject("该场考试不存在")
            }
        })
    ])
]