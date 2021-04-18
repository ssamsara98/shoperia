const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const router = require('./router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (app.get('env') !== 'production') app.use(express.static(path.join(__dirname, '..', 'public')));
if (app.get('env') === 'production')
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/', router);

if (app.get('env') === 'production')
  app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.stack = req.app.get('env') === 'development' ? err.stack : undefined;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return next();
});
app.use(async (req, res) => {
  return res.render('error');
});

module.exports = app;
