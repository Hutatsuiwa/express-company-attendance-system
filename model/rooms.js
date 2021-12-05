const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllRoom = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT id,room_name,total_num,create_time,update_time FROM rooms`
        let temp = await query(sql)
        let room = {}
        let result=[]
        for(i=0;i<temp.length;i++){
            room.roomId=temp[i].id
            room.roomName=temp[i].room_name
            room.maxNum=temp[i].total_num
            room.creatTime=temp[i].create_time
            room.updateTime=temp[i].update_time
            result.push(room)
            room={}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getRoomByRoomId = async (roomId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let roomId=13
        let sql = `SELECT id,room_name,total_num,create_time,update_time FROM rooms WHERE id=?`
        let temp = await query(sql,roomId)
        let room = {}
        room.roomId=temp[0].id
        room.roomName=temp[0].room_name
        room.maxNum=temp[0].total_num
        room.creatTime=temp[0].create_time
        room.updateTime=temp[0].update_time

        connection.release()
        return room
    }catch(err){
        throw err
    }
}

exports.getRoomStateByRoomId = async (roomId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let roomId=13
        let sql = `SELECT reservation_num,examining_num,total_num FROM rooms WHERE id=?`
        let temp = await query(sql,roomId)
        let room = {}
        room.reservationNum=temp[0].reservation_num
        room.examiningNum=temp[0].examining_num
        room.maxNum=temp[0].total_num

        connection.release()
        return roomState
    }catch(err){
        throw err
    }
}

exports.addRoom = async (room)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let room={
        //     roomName:"test111",
        //     maxNum:30
        // }
        let sql = `INSERT INTO examination_rooms VALUES(DEFAULT,?,?,DEFAULT,DEFAULT)`
        let params=[room.roomName,room.maxNum]
        await query(sql,params)
        
        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.deleteRoom = async (roomId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let roomId=104
        let sql = `DELETE FROM examination_rooms WHERE id=?`
        await query(sql,roomId)

        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.updateRoom = async (room)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let room={
        //     roomId:105,
        //     roomName:"111",
        //     maxNum:111
        // }
        let params=[room.roomName,room.maxNum,room.roomId]
        let sql = `UPDATE examination_rooms set room_name=?,total_num=? WHERE id=?`
        await query(sql,params)

        connection.release()
        return
    }catch(err){
        throw err
    }
}

//数据验证所需
exports.findRoomById = async(roomId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select room_name from examination_rooms where id=?"
        let result = await query(sql,roomId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}