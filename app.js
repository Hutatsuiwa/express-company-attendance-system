const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const multer = require('multer');
const errorHandler = require('./middleware/errorHandler')
const autoStartAndCloseExam = require('./utils/startAndCloseExam')

const adminsRouter = require('./routes/admins');
const examinationsRouter = require('./routes/examinations');
const questionsRouter = require('./routes/questions');
const roomsRouter = require('./routes/rooms');
const scoresRouter = require('./routes/scores');
const studentsRouter = require('./routes/students');

const app = express();

// 自动设置考试定时器
autoStartAndCloseExam()

//配置中间件
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false ,limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//使用路由
app.use('/api/admins', adminsRouter);
app.use('/api/examinations', examinationsRouter);
app.use('/api/students', studentsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/scores', scoresRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler());

module.exports = app;
