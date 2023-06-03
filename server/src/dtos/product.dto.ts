import { Types } from 'mongoose';

export interface ProductIdParamsDto {
  productId: Types.ObjectId;
}

export interface AddProductReqDto {
  name: string;
  price: number;
  stock?: number;
  condition?: string;
  description?: string;
  weight: number;
  imageIds: Array<Types.ObjectId>;
}
