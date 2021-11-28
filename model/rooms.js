const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllRoom = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let rooms = [{
            roomId:"temp",
            roomName:"temp",
            maxNum:"temp",
            creatTime:"temp",
            updateTime:"temp"
        }]
        connection.release()
        return rooms
    }catch(err){
        throw err
    }
}

exports.getRoomByRoomName = async (roomName)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let rooms = [{
            roomId:"temp",
            roomName:"temp",
            maxNum:"temp",
            creatTime:"temp",
            updateTime:"temp"
        }]
        connection.release()
        return rooms
    }catch(err){
        throw err
    }
}

exports.getRoomStateByRoomName = async (roomName)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let roomState = {
            reservationNum:"temp",
            examiningNum:"temp",
            maxNum:"temp"
        }
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
        let sql = "select * from students"
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.deleteRoom = async (roomName)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
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
        let sql = "select * from students"
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
