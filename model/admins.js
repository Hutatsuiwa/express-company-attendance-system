const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllAdmins = async()=>{
    try{
        // 从连接池获取连接
        let connection = await getConnection()
        // 将connection.query方法转换成promise格式
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql);
        let admins = [{
            userId:"temp",
            username:"temp",
            creatTime:"temp",
            updataTime:"temp"
        }]
        // 释放连接
        connection.release()
        return admins
    }catch(err){
        throw err
    }
}
exports.getAdminByName = async (username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let admin = {
            userId:"temp",
            username:"temp",
            creatTime:"temp",
            updataTime:"temp"
        }
        connection.release()
        return admin
    }catch(err){
        throw err
    }
}

exports.addAdmin = async (admin)=>{
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

exports.updateAdmin = async (admin)=>{
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

exports.deleteAdmin = async (username)=>{
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

exports.adminMyself = async (username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select * from students"
        let result = await query(sql)
        let admin = {
            userId:"temp",
            username:"temp",
            creatTime:"temp",
            updataTime:"temp"
        }
        connection.release()
        return admin
    }catch(err){
        throw err
    }
}

//数据验证所需
exports.findAdmin = async(username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select username from admins where username=?"
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
        let sql = "select password from admins where username=?"
        let result = await query(sql,username)
        connection.release()
        return result.length ? result[0].password : null
    }catch(err){
        throw err
    }
}
