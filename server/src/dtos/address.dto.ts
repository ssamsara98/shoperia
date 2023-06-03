import { Types } from 'mongoose';

export interface AddressIdParamsDto {
  addressId: Types.ObjectId;
}

export interface CreateAddressReqDto {
  title: string;
  name: string;
  telephone: string;
  detail: {
    province: string;
    city: string;
    district: string;
    address: string;
    postalCode: number;
  };
}

export interface UpdateAddressReqDto {
  title: string;
  name: string;
  telephone: string;
  detail: {
    country: string;
    province: string;
    city: string;
    district: string;
    address: string;
    postalCode: string;
  };
}
