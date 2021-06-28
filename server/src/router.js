const express = require('express');
const createHttpError = require('http-errors');

const addressRouter = require('./routes/address-router');
const authRouter = require('./routes/auth-router');
const cartRouter = require('./routes/cart-router');
const orderRouter = require('./routes/order-router');
const productRouter = require('./routes/product-router');
const uploadRouter = require('./routes/upload-router');
const userRouter = require('./routes/user-router');

// API
const routerApi = express.Router();

routerApi.use('/v1/auth', authRouter);
routerApi.use('/v1/user', userRouter);
routerApi.use('/v1/address', addressRouter);
routerApi.use('/v1/upload', uploadRouter);
routerApi.use('/v1/product', productRouter);
routerApi.use('/v1/cart', cartRouter);
routerApi.use('/v1/order', orderRouter);

// catch 404 and forward to error handler
routerApi.use(function (req, res, next) {
  return next(createHttpError(404));
});
// error handler
routerApi.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.stack =
    req.app.get('env') === 'development' ? err.stack.split('\n').map((el) => el.trim()) : undefined;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return next();
});
routerApi.use(async (req, res) => {
  const result = { ...res.locals, meta: { status: res.statusCode } };
  return res.json(result);
});

// Router
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

router.use('/api', routerApi);

module.exports = router;
