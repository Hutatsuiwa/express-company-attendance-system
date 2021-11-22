const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllExaminations = async ()=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomName:"temp",
            courseName:"temp",
            startTime:"temp",
            reservationNum:"temp",
            maxNum:"temp"
        }]
        connection.release()
        return examinations
    }catch(err){
        throw err
    }
}
    
exports.getExaminationByUsername = async (username)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomName:"temp",
            courseName:"temp",
            startTime:"temp",
            reservationNum:"temp",
            maxNum:"temp"
        }]
        connection.release()
        return examinations
    }catch(err){
        throw err
    }
}
    
exports.getExaminationDoing = async (username)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        let examinationDetail={
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseName:"temp",
            startTime:"temp",
            examinationState:"temp"
        }
        connection.release()
        return examinationDetail
    }catch(err){
        throw err
    }
}

exports.getExaminationByCourseName = async (courseName)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomName:"temp",
            courseName:"temp",
            startTime:"temp",
            reservationNum:"temp",
            maxNum:"temp"
        }]
        connection.release()
        return examinations
    }catch(err){
        throw err
    }
}
    
exports.getExaminationByCourseTime = async (courseName,startTime,endTime)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomName:"temp",
            courseName:"temp",
            startTime:"temp",
            reservationNum:"temp",
            maxNum:"temp"
        }]
        connection.release()
        return examinations
    }catch(err){
        throw err
    }
}
    
exports.addExamination = async (examination)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
    
exports.deleteExamination = async (examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
    
exports.updateExamination = async (examination)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
    
exports.reservationExamination = async (reservation)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
    
exports.closeExamination = async (examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisfy(connection.query).bind(connection)
        let sql = ""
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}
    