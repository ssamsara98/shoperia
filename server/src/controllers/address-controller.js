const expressAsyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

const Address = require('../models/address');

class AddressController {
  static createAddress = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { title, name, phone, detail } = req.body;

    const addressList = await Address.find({ user: req.user.id });

    if (addressList.length > 10) throw createHttpError(422, 'You have to much address');

    const newAddress = new Address({
      user: req.user.id,
      title,
      name,
      phone,
      primary: addressList.length === 0,
      detail: {
        province: detail.province,
        city: detail.city,
        district: detail.district,
        address: detail.address,
        postal_code: detail.postal_code,
      },
    });
    await newAddress.save();

    res.status(201);
    const result = {
      data: {
        id: newAddress.id,
        title: newAddress.title,
        name: newAddress.name,
        phone: newAddress.phone,
        primary: newAddress.primary,
        detail: {
          country: newAddress.detail.country,
          province: newAddress.detail.province,
          city: newAddress.detail.city,
          district: newAddress.detail.district,
          address: newAddress.detail.address,
          postal_code: newAddress.detail.postal_code,
        },
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static getAddressList = expressAsyncHandler(async (req, res) => {
    const addressList = (await Address.find({ user: req.user.id })).map((address) => {
      const result = {
        id: address.id,
        title: address.title,
        name: address.name,
        phone: address.phone,
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
    return res.json(result);
  });

  static getAddress = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { address_id } = req.params;
    const address = await Address.findOne({
      _id: mongoose.Types.ObjectId(address_id),
      user: req.user.id,
    });

    if (!address) throw createHttpError(404);

    const result = {
      data: {
        id: address.id,
        title: address.title,
        name: address.name,
        phone: address.phone,
        primary: address.primary,
        detail: address.detail,
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static updateAddress = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { address_id } = req.params;
    const { title, name, phone, detail } = req.body;

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(address_id), user: req.user.id },
      {
        title,
        name,
        phone,
        detail: {
          country: detail.country,
          province: detail.province,
          city: detail.city,
          district: detail.district,
          address: detail.address,
          postal_code: detail.postal_code,
        },
      },
      { new: true },
    );

    const result = {
      data: {
        id: updatedAddress.id,
        title: updatedAddress.title,
        name: updatedAddress.name,
        phone: updatedAddress.phone,
        primary: updatedAddress.primary,
        detail: {
          country: updatedAddress.detail.country,
          province: updatedAddress.detail.province,
          city: updatedAddress.detail.city,
          district: updatedAddress.detail.district,
          address: updatedAddress.detail.address,
          postal_code: updatedAddress.detail.postal_code,
        },
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static updateAddressPrimary = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { address_id } = req.params;

    await Address.updateMany(
      { user: req.user.id, primary: true },
      { primary: false },
      { new: true },
    );
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(address_id), user: req.user.id },
      { primary: true },
      { new: true },
    );

    const result = {
      data: {
        id: updatedAddress.id,
        title: updatedAddress.title,
        name: updatedAddress.name,
        phone: updatedAddress.phone,
        primary: updatedAddress.primary,
        detail: {
          country: updatedAddress.detail.country,
          province: updatedAddress.detail.province,
          city: updatedAddress.detail.city,
          district: updatedAddress.detail.district,
          address: updatedAddress.detail.address,
          postal_code: updatedAddress.detail.postal_code,
        },
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static deleteAddress = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { address_id } = req.params;

    const deletedAddress = await Address.findOne({
      _id: mongoose.Types.ObjectId(address_id),
      user: req.user.id,
    });

    if (!deletedAddress) throw createHttpError(404, 'Address not found');

    await deletedAddress.delete();

    res.status(204);
    const result = {
      message: 'Address has been deleted',
      data: {},
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });
}

module.exports = AddressController;
