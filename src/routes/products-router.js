const express = require('express');
const { body } = require('express-validator');

const ProductsController = require('../controllers/products-controller');

const productsRouter = express.Router();

productsRouter.post(
  '/add-product',
  body('name').notEmpty(),
  body('price').notEmpty().isCurrency({ allow_negatives: false }),
  body('stock').optional().isInt({ gt: 0 }),
  body('condition')
    .optional()
    .matches(/(New|Used)/),
  body('image_ids').isArray({ min: 0, max: 8 }),
  ProductsController.addProduct,
);
productsRouter.get('/get-product', ProductsController.getProduct);
productsRouter.get('/get-product/:product_id', ProductsController.getProductById);
productsRouter.patch('/update-product/:product_id', ProductsController.updateProduct);
productsRouter.delete('/delete-product/:product_id', ProductsController.deleteProduct);

module.exports = productsRouter;
