const roomModel = require('../model/rooms');

// 获取所有考场信息
exports.getAllRoom = async (req,res,next)=>{
    try{
        let result = await roomModel.getAllRoom();
        res.status(200).json({
            rooms:result
        });
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}

// 通过考场ID获取考场信息
exports.getRoomByRoomId = async (req,res,next)=>{
    try{
        let result = await roomModel.getRoomByRoomId(req.params.roomId);
        res.status(200).json({
            rooms:result
        });
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}

// 通过考场ID获取考场状态信息
exports.getRoomStateByRoomId = async (req,res,next)=>{
    try{
        let result = await roomModel.getRoomStateByRoomId(req.params.roomId);
        res.status(200).json({
            roomState:result
        });
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}

// 添加考场信息
exports.addRoom = async (req,res,next)=>{
    try{
        await roomModel.addRoom(req.body.room);
        res.status(204).end();
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}

// 删除考场信息
exports.deleteRoom = async (req,res,next)=>{
    try{
        await roomModel.deleteRoom(req.params.roomId);
        res.status(204).end();
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}

// 修改考场信息
exports.updateRoom = async (req,res,next)=>{
    try{
        await roomModel.updateRoom(req.body.room);
        res.status(204).end();
    }catch(err){
        err.status = 400
        err.message = "失败"
        next(err);
    }
}
