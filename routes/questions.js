const express = require('express');
const router = express.Router();

const quesCtl = require('../controller/questions');

/* 试题路由 */

// 获取所有选择题
router.get("/search/choice/all",quesCtl.getChoiceQuestion);

// 获取所有判断题
router.get("/search/judge/all",quesCtl.getJudgeQuestion);

// 获取所有多选题
router.get("/search/multiple/all",quesCtl.getMultipleQuestion);

// 添加选择题
router.post("/add/choice",quesCtl.addChoiceQuestion);

// 添加判断题
router.post("/add/judge",quesCtl.addJudgeQuestion);

// 添加多选题
router.post("/add/multiple",quesCtl.addMultipleQuestion);

// 修改选择题
router.put("/update/choice",quesCtl.updateChoiceQuestion);

// 修改判断题
router.put("/update/judge",quesCtl.updateJudgeQuestion);

// 修改多选题
router.put("/update/multiple",quesCtl.updateMultipleQuestion);

// 删除选择题
router.delete("/delete/choice/:questionId",quesCtl.deleteChoiceQuestion);

// 删除判断题
router.delete("/delete/judge/:questionId",quesCtl.deleteJudgeQuestion);

// 删除多选题
router.delete("/delete/multiple/:questionId",quesCtl.deleteMultipleQuestion);

// 通过用户名和科目类型获取试卷
router.get("/search/paper/:username/:courseId",quesCtl.getPaperByUserCourse);

// 生成试卷
router.get("/paper",quesCtl.getPaper);

// 提交答案
router.post("/submit",quesCtl.submitAnswer);

module.exports = router;
