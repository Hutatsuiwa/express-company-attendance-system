const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.register = async (students)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let parms=[students.identityNumber,students.username,students.password,students.origiImageBase64]
        let sql = `INSERT into audits VALUES(?,?,?,?)`
        await query(sql,parms);


        connection.release()
        return
    }catch(err){
        console.error(err)
        throw err
    }
}

exports.getList = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT identity_num,user_name,user_password,face_base64 FROM audits`
        let temp = await query(sql);

        let student = {}
        let result=[]
        for(let item of temp){
            student.username=item.user_name
            student.password=item.user_password
            student.imageBase64=item.face_base64
            student.identityNumber=item.identity_num
            result.push(student)
            student = {}
        }

        connection.release()
        return result
    }catch(err){
        console.error(err)
        throw err
    }
}

exports.reject = async (username)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql = `DELETE FROM audits where user_name=?`
        await query(sql,username)

        connection.release()
        return
    }catch(err){
        console.error(err)
        throw err
    }
}

exports.getStatus = async (identityNumber)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let result = 0
        let sql1= `SELECT identity_num FROM audits WHERE identity_num=?`
        let temp1 = await query(sql1,identityNumber);
        if(temp1.length) result = 1
        let sql2= `SELECT identity_num FROM students WHERE identity_num=?`
        let temp2 = await query(sql2,identityNumber);
        if(temp2.length) result = 2

        connection.release()
        return result
    }catch(err){
        console.error(err)
        throw err
    }
}

// 数据验证相关

exports.findStudentByName = async(username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select user_name from audits where user_name=?"
        let result = await query(sql,username)
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findStudentByIdentity = async(identityNumber)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select user_name from audits where identity_num=?"
        let result = await query(sql,identityNumber)
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}