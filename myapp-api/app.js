var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

var logger = require('morgan');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house.js');
var bannerRouter = require('./routes/banner');
var problemRouter = require('./routes/problem');
var shopRouter = require('./routes/shop');
var listRouter = require('./routes/list')
var addressRouter = require('./routes/address')
var cartRouter = require('./routes/cart')
var yuyueRouter = require('./routes/yuyue')
var orderRouter = require('./routes/order')
var searchRouter = require('./routes/search')
// var dindanRouter = require('./routes/dindan')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.url !== '/users/login' && req.url !== '/users/register' && req.url !== '/banner' && req.url !== '/problem/import' && req.url !== '/problem' && req.url !== 'problem/answer' && req.url !=='/search') {
    let token = req.headers.token || req.query.token || req.body.token;
    if (token) {
      jwt.verify(token, 'daxunxun', function(err, decoded) {
        if (err) {
          res.send({ 
            code: '10119', 
            message: 'token验证错误.' 
          });
        } else {
          req.decoded = decoded;
          console.log('验证成功', decoded);
          next()
        }
      }) 
    } else {
      res.send({ 
        code: '10119', 
        message: '没有找到token.' 
      });
    }
  } else {
    next()
  }
})


app.use('/', houseRouter);
app.use('/banner',bannerRouter);
app.use('/users', usersRouter);
app.use('/problem', problemRouter);
app.use('/shop',shopRouter);
app.use('/list',listRouter);
app.use('/address',addressRouter);
app.use('/cart',cartRouter);
app.use('/yuyue',yuyueRouter);
app.use('/order',orderRouter);
app.use('/search',searchRouter);
// app.use('/dindan',dindanRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
