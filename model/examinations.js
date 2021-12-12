const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getAllExaminations = async () => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        let sql = `SELECT e.id,room_name,course_id,start_time,reservation_num,total_num FROM examinations e LEFT JOIN rooms on room_id=rooms.id`
        let temp = await query(sql);
        let examination = {}
        let result = []
        for (let i = 0; i < temp.length; i++) {
            examination.examinationId = temp[i].id
            examination.roomId = temp[i].room_id
            examination.roomName = temp[i].room_name
            examination.courseId = temp[i].course_id
            if (temp[i].course_id == 1) examination.courseName = "科目一"
            else if (temp[i].course_id == 2) examination.courseName = "科目二"
            else if (temp[i].course_id == 2) examination.courseName = "科目三"
            else examination.courseName = "科目四"
            examination.startTime = temp[i].start_time
            examination.reservationNum = temp[i].reservation_num
            examination.maxNum = temp[i].total_num
            result.push(examination)
            examination = {}
        }

        connection.release()
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.getExaminationByUserId = async (userId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let user_id=1
        let preRegisteredTime = 0//提前预约考试时间 毫秒 86400000是一天
        let sql = `SELECT * FROM states_detail WHERE user_id=? and course_id in (1,4) and state_id=1`
        let course_id = await query(sql, userId);
        let sql2 = `SELECT e.id,room_id,room_name,course_id,start_time,reservation_num,total_num
        FROM examinations e LEFT JOIN rooms on room_id=rooms.id
        where (start_time-?)>? and course_id=? and reservation_num<total_num`
        let params = [preRegisteredTime, Number(Date.now()), course_id[0].course_id]
        let temp = await query(sql2, params);
        let examination = {}
        let result = []
        for (let i = 0; i < temp.length; i++) {
            examination.examinationId = temp[i].id
            examination.roomId = temp[i].room_id
            examination.roomName = temp[i].room_name
            examination.courseId = temp[i].course_id
            if (temp[i].course_id == 1) examination.courseName = "科目一"
            else if (temp[i].course_id == 2) examination.courseName = "科目二"
            else if (temp[i].course_id == 2) examination.courseName = "科目三"
            else examination.courseName = "科目四"
            examination.startTime = temp[i].start_time
            examination.reservationNum = temp[i].reservation_num
            examination.maxNum = temp[i].total_num
            result.push(examination)
            examination = {}
        }

        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.getExaminationDoing = async (userId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let userId=13
        let sql = `SELECT * FROM states_detail WHERE user_id=? and examination_id is not NULL`
        let exam = await query(sql, userId);
        let result = []
        let examinationDetail = {}
        for (let i = 0; i < exam.length; i++) {
            let sql2 = `SELECT e.id,room_id,room_name,course_id,start_time from examinations e INNER JOIN rooms r on room_id=r.id WHERE e.id=?`
            let temp = await query(sql2, exam[i].examination_id);
            examinationDetail.examinationId = temp[0].id
            examinationDetail.roomId = temp[0].room_id
            examinationDetail.roomName = temp[0].room_name
            examinationDetail.courseId = temp[0].course_id
            if (temp[0].course_id == 1) examinationDetail.courseName = "科目一"
            else if (temp[0].course_id == 1) examinationDetail.courseName = "科目二"
            else if (temp[0].course_id == 1) examinationDetail.courseName = "科目三"
            else examinationDetail.courseName = "科目四"
            examinationDetail.startTime = temp[0].start_time
            if (Date.now() < temp[0].start_time*1) examinationDetail.examinationState = "未开始"
            else if ((temp[0].start_time*1 + 2700000) < Date.now()) examinationDetail.examinationState = "已结束"
            else examinationDetail.examinationState = "正在考试"
            result.push(examinationDetail)
            examinationDetail = {}
        }

        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.getExaminationByCourseId = async (courseId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let courseId=1
        let sql = `SELECT e.id,room_name,course_id,start_time,reservation_num,total_num FROM examinations e LEFT JOIN rooms on room_id=rooms.id WHERE course_id=?`
        let temp = await query(sql, courseId);
        let examination = {}
        let result = []
        for (let i = 0; i < temp.length; i++) {
            examination.examinationId = temp[i].id
            examination.roomId = temp[i].room_id
            examination.roomName = temp[i].room_name
            examination.courseId = temp[i].course_id
            if (temp[i].course_id == 1) examination.courseName = "科目一"
            else if (temp[i].course_id == 2) examination.courseName = "科目二"
            else if (temp[i].course_id == 2) examination.courseName = "科目三"
            else examination.courseName = "科目四"
            examination.startTime = temp[i].start_time
            examination.reservationNum = temp[i].reservation_num
            examination.maxNum = temp[i].total_num
            result.push(examination)
            examination = {}
        }

        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.getExaminationByCourseTime = async (courseId, startTime, endTime) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let courseId=1
        // let startTime=1637828995800
        // let endTime=1637828995800+2700000
        let params = [courseId, startTime, endTime]
        let sql = `SELECT e.id,room_id,room_name,course_id,start_time,reservation_num,total_num from examinations e INNER JOIN rooms r on room_id=r.id WHERE course_id=? and start_time BETWEEN ? and ?`
        let temp = await query(sql, params);
        let examination = {}
        let result = []
        for (let i = 0; i < temp.length; i++) {
            examination.examinationId = temp[i].id
            examination.roomId = temp[i].room_id
            examination.roomName = temp[i].room_name
            examination.courseId = temp[i].course_id
            if (temp[i].course_id == 1) examination.courseName = "科目一"
            else if (temp[i].course_id == 2) examination.courseName = "科目二"
            else if (temp[i].course_id == 2) examination.courseName = "科目三"
            else examination.courseName = "科目四"
            examination.startTime = temp[i].start_time
            examination.reservationNum = temp[i].reservation_num
            examination.maxNum = temp[i].total_num
            result.push(examination)
            examination = {}
        }

        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.addExamination = async (examination) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let examination={roomId:2,
        //     courseId:1,
        //     startTime:1638258560898,
        //     start_timeout_id:0,
        //     end_timeout_id:1
        // }
        let params = [examination.roomId,
        examination.courseId,
        examination.startTime]
        let sql = `INSERT INTO examinations VALUES(DEFAULT,?,?,?,NULL,DEFAULT,DEFAULT,NULL,NULL)`
        let examId = await query(sql, params);//创建考试


        if (examination.courseId == 1) { choiceNum = 40; judgeNum = 10; multipleNum = 0 }
        else { choiceNum = 30; judgeNum = 10; multipleNum = 10 }
        let questions = {}

        let sql1 = `SELECT * from questions_choice ORDER BY RAND() LIMIT ?`//生成选择题(单选)
        let choiceQuestion = await query(sql1, choiceNum)
        questions.choices = []
        let choices = {}
        for (let i = 0; i < choiceQuestion.length; i++) {
            choices.id = choiceQuestion[i].id
            choices.content = choiceQuestion[i].content
            choices.options = []
            let sql0 = `SELECT * from answers_choice WHERE qid=?`
            let answers = await query(sql0, choices.id)
            for (let j = 0; j < answers.length; j++) {
                let option = {}
                option.key = answers[j].key
                option.content = answers[j].content
                option.flag = answers[j].flag
                choices.options.push(option)
            }
            questions.choices.push(choices)
            choices = {}
        }

        let sql2 = `SELECT * from questions_judge ORDER BY RAND() LIMIT ?`//生成判断题
        let judgeQuestion = await query(sql2, judgeNum)
        questions.judges = []
        let judges = {}
        for (let i = 0; i < judgeQuestion.length; i++) {
            judges.id = judgeQuestion[i].id
            judges.content = judgeQuestion[i].content
            judges.options = []
            let sql0 = `SELECT * from answers_judge WHERE qid=?`
            let answers = await query(sql0, judges.id)
            for (let j = 0; j < answers.length; j++) {
                let option = {}
                option.key = answers[j].key
                option.content = answers[j].content
                option.flag = answers[j].flag
                judges.options.push(option)
            }
            questions.judges.push(judges)
            judges = {}
        }

        let sql3 = `SELECT * from questions_choices ORDER BY RAND() LIMIT ?`//生成多选题
        let multipleQuestion = await query(sql3, multipleNum)
        questions.multiples = []
        let multiples = {}
        for (let i = 0; i < multipleQuestion.length; i++) {
            multiples.id = multipleQuestion[i].id
            multiples.content = multipleQuestion[i].content
            multiples.options = []
            let sql0 = `SELECT * from answers_choices WHERE qid=?`
            let answers = await query(sql0, multiples.id)
            for (let j = 0; j < answers.length; j++) {
                let option = {}
                option.key = answers[j].key
                option.content = answers[j].content
                option.flag = answers[j].flag
                multiples.options.push(option)
            }
            questions.multiples.push(multiples)
            multiples = {}
        }

        let result = {}
        result.questions = questions
        let paper_str = JSON.stringify(result)
        let sql_insert_paper = `INSERT into papers VALUES(?,?)`//将生成的试卷存入数据库
        let params2 = [examId.insertId, paper_str]
        await query(sql_insert_paper, params2)

        connection.release()
        return examId.insertId
    } catch (err) {
        throw err
    }
}

exports.deleteExamination = async (examinationId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let examinationId=1005
        let sql = `DELETE FROM examinations WHERE id=?`
        await query(sql, examinationId);
        //数据库触发了3个位于examinations表的触发器
        //1.考场初始化 UPDATE room_states set reservation_num=0,examining_num=0 WHERE room_id=old.room_id;
        //2.删除考卷 delete from papers  WHERE paper_id=old.id;
        //3.删除考生相应作答  delete from stu_answers WHERE exam_id=old.id;

        connection.release()
        return
    } catch (err) {
        throw err
    }
}

exports.updateExamination = async (examination) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let examination={
        //     examinationId:1005,
        //     roomId:3,
        //     courseId:4,
        //     startTime:1638258560898,
        //     start_timeout_id:112,
        //     close_timeout_id:1
        // }
        let params = [examination.roomId,
        examination.courseId,
        examination.startTime,
        examination.examinationId]
        let sql = `UPDATE examinations SET
         room_id=?,course_id=?,start_time=? WHERE id=?`
        await query(sql, params);

        connection.release()
        return
    } catch (err) {
        throw err
    }
}

exports.reservationExamination = async (reservation) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let reservation={
        //     userId:13,
        //     examinationId:13
        // }
        let sql1 = `SELECT id,room_id,course_id from examinations where id=?`
        //找到考试对应 考场id 以及 科目id
        let roomIdAndCourseId = await query(sql1, reservation.examinationId);
        //更新考生状态表 已预约 对应科目考试
        let sql2 = `UPDATE students_states set examination_id=?,state_id=2 where course_id=? and user_id=?`
        let params = [reservation.examinationId, roomIdAndCourseId[0].course_id, reservation.userId]
        await query(sql2, params);
        //更新考场状态 已预约人数+1
        let sql3 = `UPDATE rooms SET reservation_num=reservation_num+1 WHERE id=?`
        await query(sql3, roomIdAndCourseId[0].room_id);

        connection.release()
        return
    } catch (err) {
        throw err
    }
}

exports.startExamination = async (examinationId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let examinationId=13
        let sql1 = `UPDATE states_detail SET state_id=3 WHERE examination_id=? and state_id=2`
        //修改考生状态 由已预约状态变更为正在考试
        await query(sql1, examinationId)
        let sql2 = `SELECT room_id,course_id FROM examinations WHERE id=?`
        //获取考试对应的考场ID(科目ID备用)
        let roomIdAndCourseId = await query(sql2, examinationId)//[{"room_id":13,"course_id":4}]
        let sql3 = `UPDATE rooms set examining_num=reservation_num WHERE id=?`
        await query(sql3, roomIdAndCourseId[0].room_id)

        connection.release()
        return
    } catch (err) {
        throw err
    }
}

exports.closeExamination = async (examinationId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        // let examinationId=13
        let sql1 = `SELECT * from states_detail WHERE examination_id=? and state_id in (2,3)`
        //获取所有关于该场考试的学员ID
        let user_ids = await query(sql1, examinationId)//[{"user_id":13,"course_id":4,"state_id":2,"state":"已预约","examination_id":13}]
        let sql2 = `UPDATE states_detail set state_id=1 WHERE examination_id=? and state_id in (2,3)`
        //将所有关于该考试的学员情况设置为未通过  超时/缺考
        let result = await query(sql2, examinationId)
        for (let i = 0; i < user_ids.length; i++) {
            let sql3 = `UPDATE scores SET score=0 WHERE user_id=? and course_id=?`
            //设置他们的成绩为0
            let params = [user_ids[i].user_id, user_ids[i].course_id]
            await query(sql3, params)
            //将空白答题情况插入answer表中
            let empty_temp = {}
            empty_temp.answer = null
            let empty = JSON.stringify(empty_temp)
            let sql3_1 = `INSERT into stu_answers VALUES(?,?,?)`
            let params_3_1 = [user_ids[i].user_id, examinationId, empty]
            await query(sql3_1, params_3_1)
        }
        let sql4 = `SELECT room_id FROM examinations WHERE id=13`
        //获取考场ID
        let room_id = await query(sql4, examinationId)
        let sql5 = `UPDATE rooms set reservation_num=0,examining_num=0 WHERE id=?`
        //初始化考场状态  预约人数和考试人数清空
        await query(sql5, room_id[0].room_id)

        connection.release()
        return
    } catch (err) {
        throw err
    }
}

//获取定时器Id
exports.findTimeoutId = async (examinationId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)

        let result = {
            // start_timeout_id,
            // close_timeout_id:
        }
        // let examinationId=13
        let sql1 = `SELECT start_timeout_id,close_timeout_id from examinations WHERE id=?`
        //找到考试对应 考场id 以及 科目id
        let temp = await query(sql1, examinationId)
        if (temp.length) {
            result.startTimeoutId = temp[0].start_timeout_id
            result.closeTimeoutId = temp[0].close_timeout_id
            connection.release()
            return result
        } else {
            connection.release()
            return null
        }
    } catch (err) {
        throw err
    }
}

//数据验证所需
exports.findCourseById = async (courseId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select course_name from courses where id=?"
        let result = await query(sql, courseId)
        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.findExaminationById = async (examinationId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select id,start_time from examinations where id=?"
        let result = await query(sql, examinationId)
        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

exports.findExaminationByRoom = async (roomId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = "select start_time from examinations where room_id=?"
        let result = await query(sql, roomId)
        connection.release()
        return result
    } catch (err) {
        throw err
    }
}

// 修改考试定时器
exports.setExaminationStartTimeout = async (examinationId, startTimeoutId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = `UPDATE examinations SET
        start_timeout_id=? WHERE id=?`
        await query(sql, [startTimeoutId, examinationId])
        connection.release()
        return
    } catch (err) {
        throw err
    }
}

exports.setExaminationCloseTimeout = async (examinationId, closeTimeoutId) => {
    try {
        let connection = await getConnection();
        let query = promisify(connection.query).bind(connection)
        let sql = `UPDATE examinations SET
        close_timeout_id=? WHERE id=?`
        await query(sql, [closeTimeoutId, examinationId])
        connection.release()
        return
    } catch (err) {
        throw err
    }
}