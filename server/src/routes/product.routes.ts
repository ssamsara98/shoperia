import e from 'express';
import { productController } from '../controllers/product.controller';
import { authMw } from '../middlewares/auth.middleware';
import { adminMw } from '../middlewares/admin.middleware';
import { productValidation } from '../validations/product.validation';
import { validationMw } from '../middlewares/validation.middleware';

export const productRouter = e.Router();

productRouter.get('/get-product-list', productController.getProduct);

productRouter.get<'/get-product/:productId', any>(
  '/get-product/:productId',
  productValidation.getProductById,
  validationMw,
  productController.getProductById,
);

productRouter.use(authMw, adminMw);

productRouter.post(
  '/add-product',
  productValidation.addProduct,
  validationMw,
  productController.addProduct,
);

productRouter.patch<'/update-product/:productId', any>(
  '/update-product/:productId',
  productValidation.updateProduct,
  validationMw,
  productController.updateProduct,
);

productRouter.delete<'/delete-product/:productId', any>(
  '/delete-product/:productId',
  productValidation.deleteProduct,
  validationMw,
  productController.deleteProduct,
);

// module.exports = productRouter;
// export default productRouter;
