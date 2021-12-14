const pool = require('./db')
const { promisify } = require('util');
const getConnection = promisify(pool.getConnection).bind(pool)

exports.getChoiceQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql1 = `SELECT * from questions_choice`
        let questions = await query(sql1)
        let result=[]
        let choice = {}
        for(let i=0;i<questions.length;i++){
            choice.id=questions[i].id
            choice.content=questions[i].content
            choice.createTime=questions[i].create_time
            choice.updateTime=questions[i].updata_time
            let sql2=`SELECT * from answers_choice WHERE qid=?`
            let answers = await query(sql2,questions[i].id)
            choice.options=[]
            for(let j=0;j<answers.length;j++){
                let option={}
                option.key=answers[j].key
                option.content=answers[j].content
                option.flag=answers[j].flag
                choice.options.push(option)
            }
            result.push(choice)
            choice={}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getJudgeQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql1 = `SELECT * from questions_judge`
        let questions = await query(sql1)
        let result=[]
        let choice = {}
        for(let i=0;i<questions.length;i++){
            choice.id=questions[i].id
            choice.content=questions[i].content
            choice.createTime=questions[i].create_time
            choice.updateTime=questions[i].updata_time
            let sql2=`SELECT * from answers_judge WHERE qid=?`
            let answers = await query(sql2,questions[i].id)
            choice.options=[]
            for(let j=0;j<answers.length;j++){
                let option={}
                option.key=answers[j].key
                option.content=answers[j].content
                option.flag=answers[j].flag
                choice.options.push(option)
            }
            result.push(choice)
            choice={}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.getMultipleQuestion = async ()=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        let sql1 = `SELECT * from questions_choices`
        let questions = await query(sql1)
        let result=[]
        let choice = {}
        for(let i=0;i<questions.length;i++){
            choice.id=questions[i].id
            choice.content=questions[i].content
            choice.createTime=questions[i].create_time
            choice.updateTime=questions[i].updata_time
            let sql2=`SELECT * from answers_choices WHERE qid=?`
            let answers = await query(sql2,questions[i].id)
            choice.options=[]
            for(let j=0;j<answers.length;j++){
                let option={}
                option.key=answers[j].key
                option.content=answers[j].content
                option.flag=answers[j].flag
                choice.options.push(option)
            }
            result.push(choice)
            choice={}
        }

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.addChoiceQuestion = async (choice)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let choice={
        //     content:"选A就对了",
        //     options:[{key:"A",content:"好的就选A",flag:1},
        //     {key:"B",content:"好的就选B",flag:0},
        //     {key:"C",content:"好的就选C",flag:0},
        //     {key:"D",content:"好的就选D",flag:0}
        // ]}
        let sql1 = `INSERT INTO questions_choice VALUES(DEFAULT,?,DEFAULT,DEFAULT)`
        let questionId = await query(sql1,choice.content)//insertId
        for(let i=0;i<choice.options.length;i++){
            let sql2=`INSERT INTO answers_choice VALUES(?,?,?,?,DEFAULT,DEFAULT)`
            let params=[questionId.insertId,choice.options[i].key,choice.options[i].content,choice.options[i].flag]
            await query(sql2,params)
        }

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

        // let judge={
        //     content:"这道题选对",
        //     options:[{key:"A",content:"好的就选对",flag:1},
        //     {key:"B",content:"错",flag:0}
        // ]}
        let sql1 = `INSERT INTO questions_judge VALUES(DEFAULT,?,DEFAULT,DEFAULT)`
        let questionId = await query(sql1,judge.content)//insertId
        for(let i=0;i<judge.options.length;i++){
            let sql2=`INSERT INTO answers_judge VALUES(?,?,?,?,DEFAULT,DEFAULT)`
            let params=[questionId.insertId,judge.options[i].key,judge.options[i].content,judge.options[i].flag]
            await query(sql2,params)
        }

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

        // let multiple={
        //     content:"选ABC就对了",
        //     options:[{key:"A",content:"好的就选A",flag:1},
        //     {key:"B",content:"好的就选B",flag:1},
        //     {key:"C",content:"好的就选C",flag:1},
        //     {key:"D",content:"好的就选D",flag:0}
        // ]}
        let sql1 = `INSERT INTO questions_choices VALUES(DEFAULT,?,DEFAULT,DEFAULT)`
        let questionId = await query(sql1,multiple.content)//insertId
        for(let i=0;i<multiple.options.length;i++){
            let sql2=`INSERT INTO answers_choices VALUES(?,?,?,?,DEFAULT,DEFAULT)`
            let params=[questionId.insertId,multiple.options[i].key,multiple.options[i].content,multiple.options[i].flag]
            await query(sql2,params)
        }

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

        // let choice={
        //     id:14,
        //     content:"选B就对了",
        //     options:[{key:"A",content:"好的就选A",flag:0},
        //     {key:"B",content:"好的就选B",flag:1},
        //     {key:"C",content:"好的就选C",flag:0},
        //     {key:"D",content:"好的就选D",flag:0}
        // ]}
        let sql1 = `UPDATE questions_choice SET content=? WHERE id=?`
        let params=[choice.content,choice.id]
        let result = await query(sql1,params)
        for(let i=0;i<choice.options.length;i++){
            let sql2="UPDATE answers_choice set content=?,flag=? WHERE qid=? and `key`=?"
            let params=[choice.options[i].content,choice.options[i].flag,choice.id,choice.options[i].key]
            await query(sql2,params)
        }

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

        // let judge={
        //     id:15,
        //     content:"选B就对了",
        //     options:[{key:"A",content:"好的就选A",flag:0},
        //     {key:"B",content:"好的就选B",flag:1},
        // ]}
        let sql1 = `UPDATE questions_judge SET content=? WHERE id=?`
        let params=[judge.content,judge.id]
        let result = await query(sql1,params)
        for(let i=0;i<judge.options.length;i++){
            let sql2="UPDATE answers_judge set content=?,flag=? WHERE qid=? and `key`=?"
            let params=[judge.options[i].content,judge.options[i].flag,judge.id,judge.options[i].key]
            await query(sql2,params)
        }

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

        // let multiple={
        //     id:6,
        //     content:"选AB就对了",
        //     options:[{key:"A",content:"好的就选AB",flag:1},
        //     {key:"B",content:"好的就选B",flag:1},
        //     {key:"C",content:"好的就选C",flag:0},
        //     {key:"D",content:"好的就选D",flag:0}
        // ]}
        let sql1 = `UPDATE questions_choices SET content=? WHERE id=?`
        let params=[multiple.content,multiple.id]
        let result = await query(sql1,params)
        for(let i=0;i<multiple.options.length;i++){
            let sql2="UPDATE answers_choices set content=?,flag=? WHERE qid=? and `key`=?"
            let params=[multiple.options[i].content,multiple.options[i].flag,multiple.id,multiple.options[i].key]
            await query(sql2,params)
        }

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

        // let questionId=16
        let sql = `DELETE FROM questions_choice WHERE id=?`
        await query(sql,questionId)
        //选项删除交给数据库的触发器

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

        // let questionId=15
        let sql = `DELETE FROM questions_judge WHERE id=?`
        await query(sql,questionId)
        //选项删除交给数据库的触发器

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

        // let questionId=6
        let sql = "DELETE FROM questions_choices WHERE id=?"
        await query(sql,questionId)
        //选项删除交给数据库的触发器

        connection.release()
        return
    }catch(err){
        throw err
    }
}

exports.getPaperByUserCourse = async (userId,courseId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let userId=13
        // let courseId=4
        let sql=`SELECT examination_id from states_detail WHERE user_id=? and course_id=?`
        //获取考试ID
        let params=[userId,courseId]
        let exam_id = await query(sql,params)//exam_id[0].examination_id
        let sql_getPaper=`SELECT paper_str from papers WHERE paper_id=?`
        //获取试卷
        let temp1 = await query(sql_getPaper,exam_id[0].examination_id)
        let paper={}
        paper=JSON.parse(temp1[0].paper_str)
        let sql_getAnswer=`SELECT * from stu_answers WHERE student_id=? and exam_id=?`
        //获取考生作答情况
        let params2=[userId,exam_id[0].examination_id]
        let temp2 = await query(sql_getAnswer,params2)
        let answer = {}
        if(temp2.length){
            answer=JSON.parse(temp2[0].answer_str)
        }

        //整合试题与作答情况
        if(answer.answer==null){//无作答情况
            //单选
            for(let i=0;i<paper.questions.choices.length;i++){
                paper.questions.choices[i].studentChoice=null
            }
            // 判断
            for(let i=0;i<paper.questions.judges.length;i++){
                paper.questions.judges[i].studentChoice=null
            }
            // 多选
            for(let i=0;i<paper.questions.multiples.length;i++){
                paper.questions.multiples[i].studentChoice=null
            }
        }
        else{
            //单选
            for(let i=0;i<paper.questions.choices.length;i++){
                paper.questions.choices[i].studentChoice=answer.answer.choice[i].optionChoice
            }
            // 判断
            for(let i=0;i<paper.questions.judges.length;i++){
                paper.questions.judges[i].studentChoice=answer.answer.judge[i].optionChoice
            }
            // 多选
            for(let i=0;i<paper.questions.multiples.length;i++){
                paper.questions.multiples[i].studentChoice=answer.answer.multiple[i].optionChoice
            }
        }
        
        connection.release()
        return paper
    }catch(err){
        throw err
    }
}

exports.getPaper = async (examinationId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        
        // let examinationId = 1037
        let sql = "select * from papers where paper_id=?"
        let temp = await query(sql,examinationId)
        let result = JSON.parse(temp[0].paper_str)

        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.submitAnswer = async (submit)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)

        // let submit = {
        //     submit:{
        //         userId:13,
        //         examinationId:1039,
        //         answer:{
        //             choice:[],
        //             judge:[],
        //             multiple:[]
        //         }
        //     }
        // }
        let sql = "insert into stu_answers VALUES(?,?,?)"
        let temp={}
        //插入考生回答
        temp.answer=submit.answer
        let str_answers = JSON.stringify(temp)
        let params=[submit.userId,submit.examinationId,str_answers]
        await query(sql,params)

        let sql_getPaper=`SELECT paper_str from papers WHERE paper_id=?`
        //获取试卷
        let paper_temp = await query(sql_getPaper,submit.examinationId)
        let paper = JSON.parse(paper_temp[0].paper_str)
        let score=0
        //单选
        for(let i=0;i<paper.questions.choices.length;i++){
            let correct=""
            for(let j=0;j<paper.questions.choices[i].options.length;j++){
                if(paper.questions.choices[i].options[j].flag=="1"){
                    correct=correct+paper.questions.choices[i].options[j].key
                    break
                }
            }
            if(correct==submit.answer.choice[i].optionChoice){
                score=score+2
            }
        }
        //判断
        for(let i=0;i<paper.questions.judges.length;i++){
            let correct=""
            for(let j=0;j<paper.questions.judges[i].options.length;j++){
                if(paper.questions.judges[i].options[j].flag=="1"){
                    correct=correct+paper.questions.judges[i].options[j].key
                    break
                }
            }
            if(correct==submit.answer.judge[i].optionChoice){
                score=score+2
            }
        }
        //多选 multiples
        for(let i=0;i<paper.questions.multiples.length;i++){
            let correct=""
            for(let j=0;j<paper.questions.multiples[i].options.length;j++){
                if(paper.questions.multiples[i].options[j].flag=="1"){
                    correct=correct+paper.questions.multiples[i].options[j].key
                }
            }
            if(correct==submit.answer.multiple[i].optionChoice){
                score=score+2
            }
        }

        //更新考生成绩
        let sql_update_score=`UPDATE scores set score=? WHERE user_id=? and course_id=?`
        let course_id = await query(`SELECT course_id FROM examinations WHERE id=?`,submit.examinationId)
        let params_update_score=[score,submit.userId,course_id[0].course_id]
        await query(sql_update_score,params_update_score)
        //更新考生状态  通过与否
        let sql_update_studentState=`UPDATE states_detail set state_id=? WHERE user_id=? and course_id=?`
        let state_id=4
        if(score<90){
            state_id=1
        }
        let params_update_studentState=[state_id,submit.userId,course_id[0].course_id]
        await query(sql_update_studentState,params_update_studentState)
        
        connection.release()
        return
    }catch(err){
        throw err
    }
}


// 数据验证相关
exports.findChoiceQuestionId = async (questionId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select id from questions_choice where id=?"
        let result = await query(sql,questionId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findJudgeQuestionId = async (questionId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select id from questions_judge where id=?"
        let result = await query(sql,questionId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}

exports.findMultipleQuestionId = async (questionId)=>{
    try{
        let connection = await getConnection()
        let query = promisify(connection.query).bind(connection)
        let sql = "select id from questions_choices where id=?"
        let result = await query(sql,questionId)
        connection.release()
        return result
    }catch(err){
        throw err
    }
}