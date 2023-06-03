import { Types } from 'mongoose';

export interface OrderIdParamsDto {
  orderId: string;
}

export interface PlaceOrderReqDto {
  consignee: {
    name: string;
    telephone: string;
    province: string;
    city: string;
    district: string;
    address: string;
    postalCode: number;
  };
  courier: string;
  service: string;
  shippingCost: number;
}
