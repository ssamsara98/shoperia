import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import Address from '../models/address';
import { AddressIdParamsDto, CreateAddressReqDto, UpdateAddressReqDto } from '../dtos/address.dto';

class AddressController {
  createAddress = expressAsyncHandler<any, any, CreateAddressReqDto>(async (req, res) => {
    const { title, name, telephone, detail } = req.body;

    const addressList = await Address.find({ user: req.user.id });

    if (addressList.length > 10) throw createHttpError(422, 'You have to much address');

    const newAddress = new Address({
      user: req.user.id,
      title,
      name,
      telephone,
      primary: addressList.length === 0,
      detail: {
        province: detail.province,
        city: detail.city,
        district: detail.district,
        address: detail.address,
        postalCode: detail.postalCode,
      },
    });
    await newAddress.save();

    res.status(201);
    const result = {
      data: {
        id: newAddress.id,
        title: newAddress.title,
        name: newAddress.name,
        telephone: newAddress.telephone,
        primary: newAddress.primary,
        detail: {
          country: newAddress.detail.country,
          province: newAddress.detail.province,
          city: newAddress.detail.city,
          district: newAddress.detail.district,
          address: newAddress.detail.address,
          postalCode: newAddress.detail.postalCode,
        },
      },
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  getAddressList = expressAsyncHandler(async (req, res) => {
    const addressList = (await Address.find({ user: req.user.id })).map((address: any) => {
      const result = {
        id: address.id,
        title: address.title,
        name: address.name,
        telephone: address.telephone,
        primary: address.primary,
        detail: address.detail,
      };
      return result;
    });

    const result = {
      data: addressList,
      meta: {
        status: res.statusCode,
        total: addressList.length,
      },
    };
    res.json(result);
    return;
  });

  getAddress = expressAsyncHandler<AddressIdParamsDto>(async (req, res) => {
    const { addressId } = req.params;
    const address = await Address.findOne({
      _id: addressId,
      user: req.user.id,
    });

    if (!address) throw createHttpError(404);

    const result = {
      data: {
        id: address.id,
        title: address.title,
        name: address.name,
        telephone: address.telephone,
        primary: address.primary,
        detail: address.detail,
      },
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  updateAddress = expressAsyncHandler<AddressIdParamsDto, any, UpdateAddressReqDto>(
    async (req, res) => {
      const { addressId } = req.params;
      const { title, name, telephone, detail } = req.body;

      const updatedAddress = await Address.findOneAndUpdate(
        { _id: addressId, user: req.user.id },
        {
          title,
          name,
          telephone,
          detail: {
            country: detail.country,
            province: detail.province,
            city: detail.city,
            district: detail.district,
            address: detail.address,
            postalCode: detail.postalCode,
          },
        },
        { new: true },
      );

      const result = {
        data: {
          id: updatedAddress?.id,
          title: updatedAddress?.title,
          name: updatedAddress?.name,
          telephone: updatedAddress?.telephone,
          primary: updatedAddress?.primary,
          detail: {
            country: updatedAddress?.detail.country,
            province: updatedAddress?.detail.province,
            city: updatedAddress?.detail.city,
            district: updatedAddress?.detail.district,
            address: updatedAddress?.detail.address,
            postalCode: updatedAddress?.detail.postalCode,
          },
        },
        meta: {
          status: res.statusCode,
        },
      };
      res.json(result);
      return;
    },
  );

  updateAddressPrimary = expressAsyncHandler<AddressIdParamsDto>(async (req, res) => {
    const { addressId } = req.params;

    await Address.updateMany(
      { user: req.user.id, primary: true },
      { primary: false },
      { new: true },
    );
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: req.user.id },
      { primary: true },
      { new: true },
    );

    const result = {
      data: {
        id: updatedAddress?.id,
        title: updatedAddress?.title,
        name: updatedAddress?.name,
        telephone: updatedAddress?.telephone,
        primary: updatedAddress?.primary,
        detail: {
          country: updatedAddress?.detail.country,
          province: updatedAddress?.detail.province,
          city: updatedAddress?.detail.city,
          district: updatedAddress?.detail.district,
          address: updatedAddress?.detail.address,
          postalCode: updatedAddress?.detail.postalCode,
        },
      },
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });

  deleteAddress = expressAsyncHandler<AddressIdParamsDto>(async (req, res) => {
    const { addressId } = req.params;

    const deletedAddress = await Address.findOne({
      _id: addressId,
      user: req.user.id,
    });

    if (!deletedAddress) throw createHttpError(404, 'Address not found');

    await deletedAddress.deleteOne();

    res.status(204);
    const result = {
      message: 'Address has been deleted',
      data: {},
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });
}

// module.exports = AddressController;
// export default AddressController;
export const addressController = new AddressController();
