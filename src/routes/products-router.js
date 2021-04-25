const express = require('express');

const ProductsController = require('../controllers/products-controller');

const productsRouter = express.Router();

productsRouter.post('/add-product', ProductsController.addProduct);
productsRouter.get('/get-product', ProductsController.getProduct);
productsRouter.get('/get-product/:product_id', ProductsController.getProductById);
productsRouter.patch('/update-product/:product_id', ProductsController.updateProduct);
productsRouter.delete('/delete-product/:product_id', ProductsController.deleteProduct);

module.exports = productsRouter;
