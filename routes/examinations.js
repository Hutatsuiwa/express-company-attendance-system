const express = require('express');
const router = express.Router();

const examCtrl = require('../controller/examinations');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
const isStudnet = require('../middleware/isStudent')
/* 考试路由 */

// 查询所有考试信息
router.get("/search/all",authorization,examCtrl.getAllExaminations);

// 获取学员能够预约的考试信息
router.get("/search/:username",authorization,examCtrl.getExaminationByUsername)

// 获取学员已预约/完成的考试信息
router.get("/student/:username",authorization,examCtrl.getExaminationDoing)

// 获取特定科目的考试信息
router.get("/search/:courseName",authorization,examCtrl.getExaminationByCourseName);

// 获取特定时间段内的特定科目的考试信息
router.get("/search/:courseName/:startTime/:endTime",authorization,examCtrl.getExaminationByCourseTime);

// 添加考试信息
router.post("/add",authorization,isAdmin,examCtrl.addExamination);

// 修改考试信息
router.put("/update",authorization,isAdmin,examCtrl.updateExamination);

// 删除考试信息
router.delete("/delete/:examinationId",authorization,isAdmin,examCtrl.deleteExamination);

// 预约考试
router.put("/reservation",authorization,isStudnet,examCtrl.reservationExamination);


module.exports = router;