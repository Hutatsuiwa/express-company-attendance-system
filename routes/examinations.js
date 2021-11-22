const express = require('express');
const router = express.Router();

const examCtrl = require('../controller/examinations');
/* 考试路由 */

// 查询所有考试信息
router.get("/search/all",examCtrl.getAllExamination);

// 获取学员能够预约的考试信息
router.get("/search/:username",examCtrl.getExaminationByUsername)

// 获取学员已预约/完成的考试信息
router.get("/student/:username",examCtrl.getExaminationDoing)

// 获取特定科目的考试信息
router.get("/search/:courseName",examCtrl.getExaminationByCourseName);

// 获取特定时间段内的特定科目的考试信息
router.get("/search/courseName/:startTime/:endTime",examCtrl.getExaminationByCourseTime);

// 添加考试信息
router.post("/add",examCtrl.addExamination);

// 修改考试信息
router.put("update",examCtrl.updateExamination);

// 删除考试信息
router.delete("/delete/:id",examCtrl.deleteExamination);

// 预约考试
router.put("/reservation",examCtrl.reservationExamination);

// 结束考试
router.put("/close",examCtrl.closeExamination);

module.exports = router;