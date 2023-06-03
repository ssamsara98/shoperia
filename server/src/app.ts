import compression from 'compression';
import cookieParser from 'cookie-parser';
import e, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { router } from './router';
import createHttpError from 'http-errors';

const app = e();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.enable('trust proxy');

// require('./utils/passport-helper');
import './utils/passport.helper';
app.use(compression());
app.use(morgan('dev'));
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
if (app.get('env') !== 'production')
  app.use(e.static(path.join(__dirname, '..', '..', 'client', 'public'), { index: false }));
if (app.get('env') === 'production')
  app.use(e.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/', router);

if (app.get('env') === 'production')
  app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return next(createHttpError(404));
});

// error handler
app.use(async function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.stack =
    req.app.get('env') === 'development'
      ? err.stack
      : // .split('\n')
        // .map((el, idx) => `${idx === 0 ? '' : '\t'}${el.trim()}`)
        // .join('\n')
        undefined;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return next();
} as ErrorRequestHandler);
app.use(async (req, res) => {
  return res.render('error');
});

// module.exports = app;
export default app;
