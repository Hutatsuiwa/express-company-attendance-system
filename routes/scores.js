const express = require('express');
const router = express.Router();

const scoreCtl = require('../controller/scores');

/*成绩路由*/

// 通过科目类型获取所有学员成绩
router.get("/search/:courseId",scoreCtl.getScoreByCourse);

// 通过学员名和科目类型获取学员成绩
router.get("/search/:username/:courseId",scoreCtl.getScoreByNameCourse);

// 通过科目类型和分数限制获取所有学员成绩
router.get("/search/:courseId/:largerThen",scoreCtl.getScoreByCourseLarge);

// 修改学员成绩
router.get("/update",scoreCtl.updateScore);

// 删除学员成绩
router.delete("/delete/:username/:courseId",scoreCtl.deleteScore);

module.exports=router;