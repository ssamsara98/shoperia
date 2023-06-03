import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Product from '../models/product';
import { AddProductReqDto, ProductIdParamsDto } from '../dtos/product.dto';

class ProductController {
  addProduct = expressAsyncHandler<any, any, AddProductReqDto>(async (req, res) => {
    const { name, price, stock, description, condition, weight, imageIds } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      condition,
      weight,
      images: imageIds,
    });

    // await (
    //   await newProduct.save()
    // )
    // .execPopulate({ path: 'images', select: 'filename filepath type' });
    await newProduct.save();

    res.status(201);
    const result = {
      data: newProduct,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  getProduct = expressAsyncHandler(async (req, res) => {
    const productList = await Product.find().populate({
      path: 'images',
      select: 'filename filepath type',
    });

    const result = {
      data: productList,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  getProductById = expressAsyncHandler<ProductIdParamsDto>(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: 'images',
      select: 'filename filepath type',
    });
    if (!product) throw createHttpError(404);

    const result = {
      data: product,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  updateProduct = expressAsyncHandler<ProductIdParamsDto, any, AddProductReqDto>(
    async (req, res) => {
      const { productId } = req.params;
      const { name, price, stock, description, condition, weight, imageIds } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          stock,
          description,
          condition,
          weight,
          images: imageIds,
        },
        { new: true },
      );

      if (!updatedProduct) throw createHttpError(404);

      const result = {
        data: updatedProduct,
        meta: {
          status: res.statusCode,
        },
      };
      res.json(result);
      return;
    },
  );

  deleteProduct = expressAsyncHandler<ProductIdParamsDto>(async (req, res) => {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw createHttpError(404);

    const result = {
      data: deletedProduct,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });
}

// module.exports = ProductController;
// export default ProductController;
export const productController = new ProductController();
