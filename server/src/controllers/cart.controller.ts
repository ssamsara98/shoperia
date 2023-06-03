import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import Cart from '../models/cart';
import { AddCartItemReqDto, CartProductIdParamsDto } from '../dtos/cart.dto';

class CartController {
  addCartItem = expressAsyncHandler<any, any, AddCartItemReqDto>(async (req, res) => {
    const { productId, quantity = 1, modified } = req.body;

    // find item
    let item = await Cart.findOne({ user: req.user.id, product: productId });

    if (item) {
      if (modified && quantity) {
        item = await Cart.findOneAndUpdate(
          { user: req.user.id, product: productId },
          { quantity: Math.abs(quantity) },
          { new: true },
        );
      } else if (item.quantity + quantity <= 0) {
        await item.deleteOne();
        res.status(204);
      } else {
        item = await Cart.findOneAndUpdate(
          { user: req.user.id, product: productId },
          { $inc: { quantity } },
          { new: true },
        );
        res.status(201);
      }
    } else {
      item = new Cart({ user: req.user.id, product: productId, quantity: Math.abs(quantity) });
      await item.save();
    }

    const result = {
      data: item,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  getCart = expressAsyncHandler(async (req, res) => {
    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'product',
        select: 'name price stock weight',
        populate: {
          path: 'images',
          select: 'filepath filename type',
        },
      })
      .exec();

    const result = {
      data: cart.map((item) => ({
        _id: item._id,
        id: item.id,
        quantity: item.quantity,
        product: item.product,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  deleteCartItem = expressAsyncHandler<any, any, CartProductIdParamsDto>(async (req, res) => {
    const { productId } = req.body;

    const item = await Cart.findOneAndDelete({ user: req.user.id, product: productId });

    if (!item) throw createHttpError(404);

    res.status(204);
    const result = {
      data: item,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });
}

// module.exports = CartController;
// export default CartController;
export const cartController = new CartController();
