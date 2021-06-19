const expressAsyncHandler = require('express-async-handler');

class AddressController {
  static createAddress = expressAsyncHandler(async (req, res) => {
    const result = { data: {}, meta: {} };
    return res.json(result);
  });

  static getAddress = expressAsyncHandler(async (req, res) => {
    const result = { data: {}, meta: {} };
    return res.json(result);
  });

  static updateAddress = expressAsyncHandler(async (req, res) => {
    const result = { data: {}, meta: {} };
    return res.json(result);
  });

  static updateAddressPrimary = expressAsyncHandler(async (req, res) => {
    const result = { data: {}, meta: {} };
    return res.json(result);
  });

  static deleteAddress = expressAsyncHandler(async (req, res) => {
    const result = { data: {}, meta: {} };
    return res.json(result);
  });
}

module.exports = AddressController;
