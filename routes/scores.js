const express = require('express');
const router = express.Router();

const scoreCtl = require('../controller/scores');

//登陆验证、身份验证
const authorization = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin')
// const isStudnet = require('../middleware/isStudent')

/*成绩路由*/

// 通过科目类型获取所有学员成绩
router.get("/search/:courseId",authorization,isAdmin,scoreCtl.getScoreByCourse);

// 通过学员名和科目类型获取学员成绩
router.get("/search/:username/:courseId",authorization,isAdmin,scoreCtl.getScoreByNameCourse);

// 通过科目类型和分数限制获取所有学员成绩
router.get("/search/:courseId/:largerThen",authorization,isAdmin,scoreCtl.getScoreByCourseLarge);

// 修改学员成绩
router.put("/update",authorization,isAdmin,scoreCtl.updateScore);

// 删除学员成绩
router.delete("/delete/:username/:courseId",authorization,isAdmin,scoreCtl.deleteScore);

module.exports=router;