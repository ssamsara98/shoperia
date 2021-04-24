const express = require('express');

const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);

// API
router.use('/api/v1/products', productsRouter);

module.exports = router;
