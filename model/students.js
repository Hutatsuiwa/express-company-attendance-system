const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllStudents = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT id,username,create_time,updata_time FROM students`
        let temp = await query(sql);
        let student = {}
        let result=[]
        for(let i=0;i<temp.length;i++){
            student.userId=temp[i].id
            student.username=temp[i].username
            let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=?`
            student.courses = await query(sql2,temp[i].id);
            student.creatTime=temp[i].create_time
            student.updataTime=temp[i].updata_time
            result.push(student)
            student = {}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getStudentByName = async (username)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let username="test"
        let sql = `SELECT id,username,create_time,updata_time FROM students where username=?`
        let temp = await query(sql,username);
        let student = {}
        student.userId=temp[0].id
        student.username=temp[0].username
        let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=?`
        student.courses = await query(sql2,temp[0].id);
        student.creatTime=temp[0].create_time
        student.updataTime=temp[0].updata_time

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

        // let student={username:"李四",password:"123"}
        let parms=[student.username,student.password]
        let sql = `INSERT INTO students VALUES(DEFAULT,?,?,DEFAULT,DEFAULT)`
        await query(sql,parms)

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

        // let student={username:"李四",newName:"李四106",password:"1111123"}
        let parms=[student.newName,student.password,student.username]
        let sql = `UPDATE students set username=?,PASSWORD=? WHERE username=?`
        await query(sql,parms)

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

        // let username="李四106"
        let sql = `DELETE FROM students where username=?`
        await query(sql,username)
        //后续删除其关联的成绩已由数据库触发器实现

        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.studentMyself = async (username)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let username="test"
        let sql = `SELECT id,username,create_time,updata_time FROM students where username=?`
        let temp = await query(sql,username);
        let student = {}
        student.userId=temp[0].id
        student.username=temp[0].username
        let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=?`
        student.courses = await query(sql2,temp[0].id);
        student.creatTime=temp[0].create_time
        student.updataTime=temp[0].updata_time

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