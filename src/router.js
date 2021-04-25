const express = require('express');

const authRouter = require('./routes/auth-router');
const productsRouter = require('./routes/products-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

// API
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/products', productsRouter);

module.exports = router;
