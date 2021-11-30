const validate = require('../middleware/validate');
const { body,param } = require('express-validator');
const examinationModel = require('../model/examinations')
const studentModel = require('../model/students')
const roomModel = require('../model/rooms')

// 查找参数验证
exports.findRoomId = [
    validate([
        param('roomId').notEmpty().withMessage("请传入考场Id"),
    ]),
    validate([
        param('roomId').custom(async (roomId)=>{
            let result = await roomModel.findRoomById(roomId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ])
]

// 添加参数验证
exports.add = [
    validate([
        body('room.roomName').notEmpty().withMessage("请传入考场名"),
        body('room.maxNum').notEmpty().withMessage("请传入考场最大容纳数量"),
    ])
]

// 删除参数验证
exports.delete = [
    validate([
        param('roomId').notEmpty().withMessage("请传入考场Id"),
    ]),
    validate([
        param('roomId').custom(async (roomId)=>{
            let result = await roomModel.findRoomById(roomId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ]),
]

// 修改参数验证
exports.update = [
    validate([
        body('room.roomId').notEmpty().withMessage("请传入考场ID"),
        body('room.roomName').notEmpty().withMessage("请传入考场名"),
        body('room.maxNum').notEmpty().withMessage("请传入考场最大容纳数量"),
    ]),
    validate([
        body('room.roomId').custom(async (roomId)=>{
            let result = await roomModel.findRoomById(roomId)
            if(!result.length){
                return Promise.reject("该考场不存在")
            }
        })
    ])
]