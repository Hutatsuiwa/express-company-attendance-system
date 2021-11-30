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
        for(let item of temp){
            admin.userId=item.id
            admin.username=item.username
            admin.creatTime=item.create_time
            admin.updataTime=item.update_time
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

        // let userId="test"
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
        let query = promisify(connection.query).bind(connection)

        // let admin ={"username":"test2","password":"1221"}
        let parms=[admin.username,admin.password]
        let sql = `INSERT into admins VALUES(DEFAULT,?,?,DEFAULT,DEFAULT)`
        await query(sql,parms);

        connection.release()
        return
    }catch(err){
        console.log(err)
        throw err
    }
}

exports.updateAdmin = async (admin)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let admin ={"username":"test2","newname":"qqq","password":"122121211"}
        let parms=[admin.username,admin.password,admin.userId]
        let sql = `UPDATE admins SET username=?,password=? WHERE id=?`
        await query(sql,parms);

        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.deleteAdmin = async (userId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let username="qqq"
        let sql=`DELETE FROM admins WHERE id=?`
        await query(sql,userId);

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
exports.findAdminByName = async(username)=>{
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

exports.findAdminById = async(userId)=>{
    try{
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id, username from admins where id=?"
        let result = await query(sql,userId)
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
