var express = require('express');
var router = express.Router();

/* 试题路由 */

router.get("/search/all", getAllExaminations);

router.get("/search/:id", getExaminationById);

router.post("/add", addExamination);

router.post("update", updateExamination);

router.delete("/delete/:id", deleteExamination);

module.exports = router;