const express = require('express');
const router = express.Router();

const scoreCtl = require('../controller/scores');

//输入数据检测、验证
const scoreValidotor = require('../validator/scores');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
// const isStudnet = require('../middleware/isStudent')

/*成绩路由*/

// 通过科目ID获取所有学员成绩
router.get("/search/:courseId",authorization,isAdmin,scoreValidotor.findCourseId,scoreCtl.getScoreByCourse);

// 通过学员ID和科目ID获取学员成绩
router.get("/search/usercourse/:userId/:courseId",authorization,isAdmin,scoreValidotor.findUserCourse,scoreCtl.getScoreByUserCourse);

// 通过科目ID和分数限制获取所有学员成绩
router.get("/search/courselimit/:courseId/:largerThen",authorization,isAdmin,scoreValidotor.findCourseLimit,scoreCtl.getScoreByCourseLarge);

// 修改学员成绩
router.put("/update",authorization,isAdmin,scoreValidotor.update,scoreCtl.updateScore);

// // 删除学员成绩
// router.delete("/delete/:userId/:courseId",authorization,isAdmin,scoreValidotor.delete,scoreCtl.deleteScore);

module.exports=router;