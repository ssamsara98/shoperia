const express = require('express');
const { body } = require('express-validator');

const ProductController = require('../controllers/product-controller');

const productRouter = express.Router();

productRouter.post(
  '/add-product',
  body('name').notEmpty(),
  body('price').notEmpty().isCurrency({ allow_negatives: false }),
  body('stock').optional().isInt({ gt: 0 }),
  body('condition')
    .optional()
    .matches(/(New|Used)/),
  body('image_ids').isArray({ min: 0, max: 8 }),
  ProductController.addProduct,
);
productRouter.get('/get-product-list', ProductController.getProduct);
productRouter.get(
  '/get-product/:product_id',

  ProductController.getProductById,
);
productRouter.patch('/update-product/:product_id', ProductController.updateProduct);
productRouter.delete('/delete-product/:product_id', ProductController.deleteProduct);

module.exports = productRouter;
