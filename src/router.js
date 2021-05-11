const express = require('express');
const addressRouter = require('./routes/address-router');

const authRouter = require('./routes/auth-router');
const cartRouter = require('./routes/cart-router');
const productRouter = require('./routes/product-router');
const shopRouter = require('./routes/shop-router');
const uploadRouter = require('./routes/upload-router');
const userRouter = require('./routes/user-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

// API
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/user', userRouter);
router.use('/api/v1/shop', shopRouter);
router.use('/api/v1/address', addressRouter);
router.use('/api/v1/upload', uploadRouter);
router.use('/api/v1/product', productRouter);
router.use('/api/v1/cart', cartRouter);

module.exports = router;
