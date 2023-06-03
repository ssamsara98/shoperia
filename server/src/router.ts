import e, { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { addressRouter } from './routes/address.routes';
import { uploadRouter } from './routes/upload.routes';
import { productRouter } from './routes/product.routes';
import { cartRouter } from './routes/cart.routes';
import { orderRouter } from './routes/order.routes';
import { rajaOngkirRouter } from './routes/raja-ongkir.routes';

// API
const routerApi = e.Router();

routerApi.use('/v1/auth', authRouter);
routerApi.use('/v1/user', userRouter);
routerApi.use('/v1/address', addressRouter);
routerApi.use('/v1/upload', uploadRouter);
routerApi.use('/v1/product', productRouter);
routerApi.use('/v1/cart', cartRouter);
routerApi.use('/v1/order', orderRouter);

routerApi.use('/raja-ongkir', rajaOngkirRouter);

// catch 404 and forward to error handler
routerApi.use(function (req, res, next) {
  return next(createHttpError(404));
});
// error handler
routerApi.use(async function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.stack =
    req.app.get('env') === 'development'
      ? err.stack.split('\n').map((el: string) => el.trim())
      : undefined;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return next();
} as ErrorRequestHandler);
routerApi.use(async (req, res) => {
  const result = { ...res.locals, meta: { status: res.statusCode } };
  return res.json(result);
});

// Router
export const router = e.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

router.use('/api', routerApi);

// module.exports = router;
// export default router;
