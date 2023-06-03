import { body, param } from 'express-validator';

class ProductValidation {
  getProductById = [param('productId').isMongoId()];

  addProduct = [
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').optional().isInt({ gt: 0 }),
    body('condition')
      .optional()
      .matches(/(New|Used)/),
    body('description').optional().isString(),
    body('weight').isNumeric(),
    body('imageIds').isArray({ min: 0, max: 8 }),
    body('imageIds.*').isMongoId(),
  ];

  updateProduct = [
    param('productId').isMongoId(),
    body('name').isString(),
    body('price').isInt({ gt: 0 }),
    body('stock').optional().isInt({ gt: 0 }),
    body('condition')
      .optional()
      .matches(/(New|Used)/),
    body('description').optional().isString(),
    body('weight').isNumeric(),
    body('imageIds').isArray({ min: 0, max: 8 }),
    body('imageIds.*').isMongoId(),
  ];

  deleteProduct = [param('productId').isMongoId()];
}

export const productValidation = new ProductValidation();
