const express = require('express');
const { body, param } = require('express-validator');

const AddressController = require('../controllers/address-controller');
const authMw = require('../middlewares/auth-mw');

const addressRouter = express.Router();

addressRouter.post(
  '/create-address',
  authMw,
  [
    body('title').isString(),
    body('name').isString(),
    body('phone').isMobilePhone('id-ID'),
    body('detail.province').isString(),
    body('detail.city').isString(),
    body('detail.district').isString(),
    body('detail.address').isString(),
    body('detail.postal_code').isNumeric({ locale: 'id-ID' }),
  ],
  AddressController.createAddress,
);

addressRouter.get('/get-address-list', authMw, AddressController.getAddressList);

addressRouter.get(
  '/get-address/:address_id',
  authMw,
  param('address_id').isMongoId(),
  AddressController.getAddress,
);

addressRouter.patch(
  '/update-address/:address_id',
  authMw,
  param('address_id').isMongoId(),
  [
    body('title').isString(),
    body('name').isString(),
    body('phone').isMobilePhone('id-ID'),
    body('detail.province').isString(),
    body('detail.city').isString(),
    body('detail.district').isString(),
    body('detail.address').isString(),
    body('detail.postal_code').isNumeric({ locale: 'id-ID' }),
  ],
  AddressController.updateAddress,
);

addressRouter.patch(
  '/update-address/:address_id/primary',
  authMw,
  param('address_id').isMongoId(),
  AddressController.updateAddressPrimary,
);

addressRouter.delete(
  '/delete-address/:address_id',
  authMw,
  param('address_id').isMongoId(),
  AddressController.deleteAddress,
);

module.exports = addressRouter;
