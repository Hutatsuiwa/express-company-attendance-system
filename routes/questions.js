const express = require('express');
const router = express.Router();

const quesCtl = require('../controller/questions');

//输入数据检测、验证
const questionValidotor = require('../validator/questions');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
const isStudnet = require('../middleware/isStudent')


/* 试题路由 */

// 获取所有选择题
router.get("/search/choice/all",authorization,isAdmin,quesCtl.getChoiceQuestion);

// 获取所有判断题
router.get("/search/judge/all",authorization,isAdmin,quesCtl.getJudgeQuestion);

// 获取所有多选题
router.get("/search/multiple/all",authorization,isAdmin,quesCtl.getMultipleQuestion);

// 添加选择题
router.post("/add/choice",authorization,isAdmin,questionValidotor.choiceAdd,quesCtl.addChoiceQuestion);

// 添加判断题
router.post("/add/judge",authorization,isAdmin,questionValidotor.judgeAdd,quesCtl.addJudgeQuestion);

// 添加多选题
router.post("/add/multiple",authorization,isAdmin,questionValidotor.multipleAdd,quesCtl.addMultipleQuestion);

// 修改选择题
router.put("/update/choice",authorization,isAdmin,questionValidotor.choiceUpdate,quesCtl.updateChoiceQuestion);

// 修改判断题
router.put("/update/judge",authorization,isAdmin,questionValidotor.judgeUpdate,quesCtl.updateJudgeQuestion);

// 修改多选题
router.put("/update/multiple",authorization,isAdmin,questionValidotor.multipleUpdate,quesCtl.updateMultipleQuestion);

// 删除选择题
router.delete("/delete/choice/:questionId",authorization,isAdmin,questionValidotor.choiceDelete,quesCtl.deleteChoiceQuestion);

// 删除判断题
router.delete("/delete/judge/:questionId",authorization,isAdmin,questionValidotor.judgeDelete,quesCtl.deleteJudgeQuestion);

// 删除多选题
router.delete("/delete/multiple/:questionId",authorization,isAdmin,questionValidotor.mutipleDelete,quesCtl.deleteMultipleQuestion);

// 通过用户名和科目类型获取试卷
router.get("/search/paper/:userId/:courseId",authorization,questionValidotor.findUserCourse,quesCtl.getPaperByUserCourse);

// 获取试卷
router.get("/paper/:examinationId",authorization,questionValidotor.findExamination,quesCtl.getPaper);

// 提交答案
router.post("/submit",authorization,isStudnet,questionValidotor.submit,quesCtl.submitAnswer);

module.exports = router;
