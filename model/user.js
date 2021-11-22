const db = require('./db');
const { promisify } = require('util');

//查询用户是否存在
exports.findUser = async (username) => {
    try {
        let connection = await db.getConnection();
        let sql = `SELECT
            users.username
        FROM
            users
        WHERE
            users.username = ?`
        let selectResult = await promisify(connection.query.bind(connection))(sql, username);
        connection.release();
        return selectResult.length;
    }catch(err){
        console.log(err);
        return false;
    }
}


//查询所有用户
exports.getAllusers = async () => {
    db.connect();
}

//查询用户通过用户名
exports.getUserByName = async (username) => {
    try {
        let sql = `SELECT
            users.id, 
            users.username, 
            users.create_time, 
            state.state, 
            courses.course
        FROM
            users
            INNER JOIN
            users_states
            ON 
                users.id = users_states.user_id
            INNER JOIN
            state
            ON 
                users_states.state_id = state.id
            INNER JOIN
            courses
            ON 
                users_states.course_id = courses.id
        WHERE
            users.username = ?
        `
        let selectResult = await db.query(sql, username)    
        console.log(selectResult[0].id);
        if (selectResult.lenght) {
            let result = {}
            result.userId = selectResult[0].id;
            result.username = selectResult[0].username;
            result.createTime = selectResult[0].create_time;
            result.examStates = [];
            selectResult.forEach((value) => {
                result.examStates.push(
                    {
                        course: value.course,
                        state: value.state
                    }
                )
            }
            )
            return result;
        }
    } catch (err) {
        return err;
    }
}