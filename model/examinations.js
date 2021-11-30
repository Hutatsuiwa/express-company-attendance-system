const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllExaminations = async ()=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseId:"temp",
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
    
exports.getExaminationByUserId = async (userId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseId:"temp",
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
    
exports.getExaminationDoing = async (userId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let examinationDetail={
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseId:"temp",
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

exports.getExaminationByCourseId = async (courseId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseId:"temp",
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
    
exports.getExaminationByCourseTime = async (courseId,startTime,endTime)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let examinations=[{
            examinationId:"temp",
            roomId:"temp",
            roomName:"temp",
            courseId:"temp",
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
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
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
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
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
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
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
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}

//开启与关闭考试
exports.startExamination = async (examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
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
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        connection.release()
        return
    }catch(err){
        throw err
    }
}

//获取定时器Id
exports.findTimeoutId = async (examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

//数据验证所需
exports.findCourseById = async(courseId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select course_name from courses where id=?"
        let result = await query(sql,courseId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findExaminationById = async(examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id from examinations where id=?"
        let result = await query(sql,examinationId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}