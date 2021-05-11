const express = require('express');

const AddressController = require('../controllers/address-controller');
const authMw = require('../middlewares/auth-mw');

const addressRouter = express.Router();

addressRouter.post('/create-address', authMw, AddressController.createAddress);

addressRouter.get('/get-address', authMw, AddressController.getAddress);

addressRouter.patch('/update-address/:address_id', authMw, AddressController.updateAddress);

addressRouter.patch(
  '/update-address/:address_id/primary',
  authMw,
  AddressController.updateAddressPrimary,
);

addressRouter.delete('/update-address/:address_id', authMw, AddressController.deleteAddress);

module.exports = addressRouter;
