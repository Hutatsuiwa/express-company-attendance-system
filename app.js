const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')

const usersRouter = require('./routes/users');
const baiduRouter = require('./routes/baidu')

const app = express();

//配置中间件
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false ,limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//使用路由
app.use('/api/users', usersRouter);
app.use('/api/baidu', baiduRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler());

module.exports = app;
