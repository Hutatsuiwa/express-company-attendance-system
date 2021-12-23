const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllStudents = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT id,username,create_time,updata_time FROM students`
        let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=? ORDER BY course_id`
        let temp = await query(sql);
        let student = {}
        let result=[]
        for(let item of temp){
            student.userId=item.id
            student.username=item.username
            student.courses = await query(sql2,item.id);
            student.creatTime=item.create_time
            student.updataTime=item.updata_time
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
        let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=? ORDER BY course_id`

        let temp = await query(sql,username);
        let student = {}
        student.userId=temp[0].id
        student.username=temp[0].username
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
        let parms=[student.username,student.password,student.identityNumber]
        let sql = `INSERT INTO students VALUES(DEFAULT,?,?,DEFAULT,DEFAULT,?)`
        await query(sql,parms)

        let sql2 = `DELETE FROM audits where user_name=?`
        await query(sql2,student.username)

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
        
        console.log(student)
        // let student={username:"李四",newName:"李四106",password:"1111123"}
        let parms=[student.username,student.password,student.userId]
        let sql = `UPDATE students set username=?,password=? WHERE id=?`
        await query(sql,parms)

        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.deleteStudent = async (userId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let userId="1"
        let sql = `DELETE FROM students where id=?`
        await query(sql,userId)
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
        let sql2=`SELECT course_id,state FROM students RIGHT JOIN states_detail on id=user_id where id=? ORDER BY course_id`
        let temp = await query(sql,username);
        let student = {}
        student.userId=temp[0].id
        student.username=temp[0].username
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
exports.findStudentByName = async(username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id,username from students where username=?"
        let result = await query(sql,username)
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findStudentById = async(userId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id,username from students where id=?"
        let result = await query(sql,userId)
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findStudentCourseState = async(userId,courseId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select state_id from students_states where user_id=? and course_id=?"
        let result = await query(sql,[userId,courseId])
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findStudentState = async(userId,examinationId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select state_id from students_states where user_id=? and examination_id=?"
        let result = await query(sql,[userId,examinationId])
        console.log(result)
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

exports.findStudentByIdentity = async(identityNumber)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id,username from students where identity_num=?"
        let result = await query(sql,identityNumber)
        console.log(result)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}