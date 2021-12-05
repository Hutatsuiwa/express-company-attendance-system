const express = require('express');
const router = express.Router();

const examCtrl = require('../controller/examinations');

//输入数据检测、验证
const examValidotor = require('../validator/examinations');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
const isStudnet = require('../middleware/isStudent')
/* 考试路由 */

// 查询所有考试信息
router.get("/search/all",authorization,examCtrl.getAllExaminations);

// 获取学员能够预约的考试信息
router.get("/search/student/:userId",authorization,examValidotor.findUserId,examCtrl.getExaminationByUserId)

// 获取学员已预约/完成的考试信息
router.get("/search/studentDo/:userId",authorization,examValidotor.findUserId,examCtrl.getExaminationDoing)

// 获取特定科目的考试信息
router.get("/search/course/:courseId",authorization,examValidotor.findCourseId,examCtrl.getExaminationByCourseId);

// 获取特定时间段内的特定科目的考试信息
router.get("/search/courseTime/:courseId/:startTime/:endTime",authorization,examValidotor.findCourseIdTime,examCtrl.getExaminationByCourseTime);

// 添加考试信息
router.post("/add",authorization,isAdmin,examValidotor.add,examCtrl.addExamination);

// 修改考试信息
router.put("/update",authorization,isAdmin,examValidotor.update,examCtrl.updateExamination);

// 删除考试信息
router.delete("/delete/:examinationId",authorization,isAdmin,examValidotor.delete,examCtrl.deleteExamination);

// 预约考试
router.put("/reservation",authorization,examValidotor.reservation,examCtrl.reservationExamination);


module.exports = router;