var express = require('express');
var router = express.Router();

/* 课程路由 */
router.get('/search/all', getAllCourses);

router.get('/search/:id', getCourseById);

router.post('/add', addCourse);

router.post('/update', updateCourse);

router.delete('/delete/:id', deleteCourse);

module.exports = router;
