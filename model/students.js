const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllStudents = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let students = [{
            userId:"temp",
            username:"temp",
            courses:[{
                course:"temp",
                courseState:"temp"
            }],
            creatTime:"temp",
            updataTime:"temp"
        }]
        connection.release()
        return students
    }catch(err){
        throw err
    }
}

exports.getStudentByName = async (username)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let student = {
            userId:"temp",
            username:"temp",
            courses:[{
                course:"temp",
                courseState:"temp"
            }],
            creatTime:"temp",
            updataTime:"temp"
        }
        connection.release()
        return student
    }catch(err){
        throw err
    }
}

exports.addStudent = async (student)=>{
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

exports.updateStudent = async (student)=>{
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

exports.deleteStudent = async (username)=>{
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

// exports.loginStudent = async ()=>{
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

exports.studentMyself = async (username)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let student = {
            userId:"temp",
            username:"temp",
            courses:[{
                course:"temp",
                courseState:"temp"
            }],
            creatTime:"temp",
            updataTime:"temp"
        }
        connection.release()
        return student
    }catch(err){
        throw err
    }
}


//数据验证所需
exports.findStudent = async(username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id,username from students where username=?"
        let result = await query(sql,username)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.validPassword = async(username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select password from students where username=?"
        let result = await query(sql,username)
        connection.release()
        return result.length ? result[0].password : null
    }catch(err){
        throw err
    }
}