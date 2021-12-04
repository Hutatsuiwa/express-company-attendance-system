const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getScoreByCourse = async (courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let scores = [{
            userId:"temp",
            username:"temp",
            score:"temp",
            scoreState:"temp",
            roomId:"temp",
            roomName:"temp",
            startTime:"temp"
        }]
        connection.release()
        return scores
    }catch(err){
        throw err
    }
}

exports.getScoreByUserCourse = async (userId,courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let score = {
            userId:"temp",
            username:"temp",
            score:"temp",
            scoreState:"temp",
            roomId:"temp",
            roomName:"temp",
            startTime:"temp"
        }
        connection.release()
        return score
    }catch(err){
        throw err
    }
}

exports.getScoreByCourseLarge = async (courseId,largerThen)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let scores = [{
            userId:"temp",
            username:"temp",
            score:"temp",
            scoreState:"temp",
            roomId:"temp",
            roomName:"temp",
            startTime:"temp"
        }]
        connection.release()
        return scores
    }catch(err){
        throw err
    }
}

exports.updateScore = async (score)=>{
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

// exports.deleteScore = async (userId,courseId)=>{
//     try{
//         let connection = await getConnection()
//         let query = promisify(connection.query).bind(connection)
//         let sql = "select * from students"
//         let result = await query(sql)
//         connection.release()
//         return
//     }catch(err){
//         throw err
//     }
// }
