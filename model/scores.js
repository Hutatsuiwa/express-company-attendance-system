const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getScoreByCourse = async (courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let courseId=1
        let sql = `SELECT * from scores WHERE course_id=? and score is not null`
        //获取所有关于该科目的学员ID及其成绩(不为空)
        let useridAndScore = await query(sql,courseId)
        let score = {}
        let result=[]
        for(let i=0;i<useridAndScore.length;i++){
            let sql_getUserName=`SELECT username from students WHERE id=?`
            //获取用户名
            username = await query(sql_getUserName,useridAndScore[i].user_id)
            score.userId=useridAndScore[i].user_id
            score.username=username[0].username
            score.score=useridAndScore[i].score
            if(useridAndScore[i].score<90){
                score.scoreState="未通过"
            }
            else{
                score.scoreState="已通过"
            }
            let sql_getExamId=`SELECT * from students_states WHERE user_id=? and course_id=?`
            //获取对应的考试Id
            let examId = await query(sql_getExamId,[useridAndScore[i].user_id,courseId])
            let sql_getOther=`SELECT e.room_id,r.room_name,e.start_time from
             examinations e INNER JOIN examination_rooms r on e.room_id=r.id WHERE e.id=?`
            //获取考场id及其名称  开考时间
            if(examId[0].examination_id){
                let other = await query(sql_getOther,examId[0].examination_id)
                score.roomId=other[0].room_id
                score.roomName=other[0].room_name
                score.startTime=other[0].start_time
            }else{
                score.roomId=null
                score.roomName=null
                score.startTime=null
            }
            result.push(score)
            score={}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getScoreByUserCourse = async (userId,courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let courseId=4
        // let userId=13
        let sql_getScore = `SELECT * from scores WHERE user_id=? and course_id=?`
        //获取所有关于该科目的学员ID及其成绩(不为空)
        let params_getScore=[userId,courseId]
        let temp_score = await query(sql_getScore,params_getScore)
        let score = {}
        score.userId=userId
        let sql_getUserName=`SELECT username from students WHERE id=?`
        //获取用户名
        username = await query(sql_getUserName,userId)
        score.username=username[0].username
        score.score=temp_score[0].score 
        if(score.score<90){
            score.scoreState="未通过"
        }
        else{
            score.scoreState="已通过"
        }
        let sql_getExamId=`SELECT * from students_states WHERE user_id=? and course_id=?`
        //获取对应的考试Id
        let examId = await query(sql_getExamId,[userId,courseId])
        let sql_getOther=`SELECT e.room_id,r.room_name,e.start_time from
            examinations e INNER JOIN examination_rooms r on e.room_id=r.id WHERE e.id=?`
        //获取考场id及其名称  开考时间
        if(examId[0].examination_id){
            let other = await query(sql_getOther,examId[0].examination_id)
            score.roomId=other[0].room_id
            score.roomName=other[0].room_name
            score.startTime=other[0].start_time
        }else{
            score.roomId=null
            score.roomName=null
            score.startTime=null
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

        // let courseId=1
        // let largerThen=90
        let sql = `SELECT * from scores WHERE course_id=? and score>?`
        //获取所有关于该科目的学员ID及其成绩(largerThen)
        let params1=[courseId,largerThen]
        let useridAndScore = await query(sql,params1)
        let score = {}
        let result=[]
        for(let i=0;i<useridAndScore.length;i++){
            let sql_getUserName=`SELECT username from students WHERE id=?`
            //获取用户名
            username = await query(sql_getUserName,useridAndScore[i].user_id)
            score.userId=useridAndScore[i].user_id
            score.username=username[0].username
            score.score=useridAndScore[i].score
            if(useridAndScore[i].score<90){
                score.scoreState="未通过"
            }
            else{
                score.scoreState="已通过"
            }
            let sql_getExamId=`SELECT * from students_states WHERE user_id=? and course_id=?`
            //获取对应的考试Id
            let examId = await query(sql_getExamId,[score.userId,courseId])
            let sql_getOther=`SELECT e.room_id,r.room_name,e.start_time from
             examinations e INNER JOIN examination_rooms r on e.room_id=r.id WHERE e.id=?`
            //获取考场id及其名称  开考时间
            if(examId[0].examination_id){
                let other = await query(sql_getOther,examId[0].examination_id)
                score.roomId=other[0].room_id
                score.roomName=other[0].room_name
                score.startTime=other[0].start_time
            }else{
                score.roomId=null
                score.roomName=null
                score.startTime=null
            }
            result.push(score)
            score={}
        }

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

        // let score = {
        //     userId:100,
        //     courseId:1,
        //     score:95
        // }
        let params=[score.score,score.userId,score.courseId]
        let sql = `UPDATE scores set score=? WHERE user_id=? and course_id=?`
        await query(sql,params)

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
