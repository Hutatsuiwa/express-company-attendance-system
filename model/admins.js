const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllAdmins = async()=>{
    try{
        // 从连接池获取连接
        let connection = await getConnection()
        // 将connection.query方法转换成promise格式
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT id,username,create_time,update_time FROM admins`
        let temp = await query(sql);
        let admin = {}
        let result=[]
        for(let i=0;i<temp.length;i++){
            admin.userId=temp[i].id
            admin.username=temp[i].username
            admin.creatTime=temp[i].create_time
            admin.updataTime=temp[i].update_time
            result.push(admin)
            admin = {}
        }
        
        // 释放连接
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getAdminByName = async (username)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let username="test"
        let sql = `SELECT id,username,create_time,update_time FROM admins WHERE username=?`
        let temp = await query(sql,username);
        let admin = {}
        admin.userId=temp[0].id
        admin.username=temp[0].username
        admin.creatTime=temp[0].create_time
        admin.updataTime=temp[0].update_time

        connection.release()
        return admin
    }catch(err){
        throw err
    }
}

exports.addAdmin = async (admin)=>{
    try{
        let connection = await getConnection();

        // let admin ={"username":"test2","password":"1221"}
        let parms=[admin.username,admin.password]
        let sql = `INSERT into admins VALUES(DEFAULT,?,?,DEFAULT,DEFAULT)`
        await query(sql,parms);

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

        // let admin ={"username":"test2","newname":"qqq","password":"122121211"}
        let id=await query(`SELECT id FROM admins WHERE username=?`,admin.username);
        let parms=[admin.newname,admin.password,id[0].id]
        let sql = `UPDATE admins SET username=?,password=? WHERE id=?`
        await query(sql,parms);

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

        // let username="qqq"
        let sql=`DELETE FROM admins WHERE username=?`
        await query(sql,username);

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

        // let username="test"
        let sql = `SELECT id,username,create_time,update_time FROM admins WHERE username=?`
        let temp = await query(sql,username);
        let admin = {}
        admin.userId=temp[0].id
        admin.username=temp[0].username
        admin.creatTime=temp[0].create_time
        admin.updataTime=temp[0].update_time

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
