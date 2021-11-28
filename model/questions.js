const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getChoiceQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let choices = [{
            id:"temp",
            content:"temp",
            createTime:"temp",
            updateTime:"temp",
            options:[{
                id:"temp",
                content:"temp",
                flag:"temp"
            }]
        }]
        connection.release()
        return choices
    }catch(err){
        throw err
    }
}

exports.getJudgeQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let judges = [{
            id:"temp",
            content:"temp",
            createTime:"temp",
            updateTime:"temp",
            options:[{
                id:"temp",
                content:"temp",
                flag:"temp"
            }]
        }]
        connection.release()
        return judges
    }catch(err){
        throw err
    }
}

exports.getMultipleQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let multiples = [{
            id:"temp",
            content:"temp",
            createTime:"temp",
            updateTime:"temp",
            options:[{
                id:"temp",
                content:"temp",
                flag:"temp"
            }]
        }]
        connection.release()
        return multiples
    }catch(err){
        throw err
    }
}

exports.addChoiceQuestion = async (choice)=>{
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

exports.addJudgeQuestion = async (judge)=>{
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

exports.addMultipleQuestion = async (multiple)=>{
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

exports.updateChoiceQuestion = async (choice)=>{
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

exports.updateJudgeQuestion = async (judge)=>{
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

exports.updateMultipleQuestion = async (multiple)=>{
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

exports.deleteChoiceQuestion = async (questionId)=>{
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

exports.deleteJudgeQuestion = async (questionId)=>{
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

exports.deleteMultipleQuestion = async (questionId)=>{
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

exports.getPaperByUserCourse = async (username,courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let questions = {
            choices:[{
                id:"temp",
                content:"temp",
                options:[{
                    id:"temp",
                    content:"temp",
                    flag:"temp"
                }],
                studentChoice:["temp"]
            }],
            judges:[{
                id:"temp",
                content:"temp",
                options:[{
                    id:"temp",
                    flag:"temp"
                }],
                studentChoice:["temp"]
            }],
            multiples:[{
                id:"temp",
                content:"temp",
                options:[{
                    id:"temp",
                    content:"temp",
                    flag:"temp"
                }],
                studentChoice:["temp"]
            }]
        }
        connection.release()
        return questions
    }catch(err){
        throw err
    }
}

exports.getPaper = async (examinationId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let questions = {
            choices:[{
                id:"temp",
                content:"temp",
                options:[{
                    id:"temp",
                    content:"temp",
                }]
            }],
            judges:[{
                id:"temp",
                content:"temp",
            }],
            multiples:[{
                id:"temp",
                content:"temp",
                options:[{
                    id:"temp",
                    content:"temp",
                }]
            }]
        }
        connection.release()
        return questions
    }catch(err){
        throw err
    }
}

exports.submitAnswer = async (submit)=>{
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
