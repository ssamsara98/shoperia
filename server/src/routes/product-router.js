const express = require('express');
const { body, param } = require('express-validator');

const ProductController = require('../controllers/product-controller');
const adminMw = require('../middlewares/admin-mw');
const authMw = require('../middlewares/auth-mw');

const productRouter = express.Router();

productRouter.get('/get-product-list', ProductController.getProduct);

productRouter.get(
  '/get-product/:product_id',
  param('product_id').isMongoId(),
  ProductController.getProductById,
);

productRouter.use(authMw, adminMw);

productRouter.post(
  '/add-product',
  [
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').optional().isInt({ gt: 0 }),
    body('condition')
      .optional()
      .matches(/(New|Used)/),
    body('description').optional().isString(),
    body('weight').isNumeric(),
    body('image_ids').isArray({ min: 0, max: 8 }),
    body('image_ids.*').isMongoId(),
  ],
  ProductController.addProduct,
);

productRouter.patch(
  '/update-product/:product_id',
  param('product_id').isMongoId(),
  [
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').optional().isInt({ gt: 0 }),
    body('condition')
      .optional()
      .matches(/(New|Used)/),
    body('description').optional().isString(),
    body('image_ids').isArray({ min: 0, max: 8 }),
    body('image_ids.*').isMongoId(),
  ],
  ProductController.updateProduct,
);

productRouter.delete(
  '/delete-product/:product_id',
  param('product_id').isMongoId(),
  ProductController.deleteProduct,
);

module.exports = productRouter;
