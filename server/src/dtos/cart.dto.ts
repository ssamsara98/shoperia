import { Types } from 'mongoose';

export interface CartProductIdParamsDto {
  productId: Types.ObjectId;
}

export interface AddCartItemReqDto {
  productId: string;
  quantity: number;
  modified?: boolean;
}
