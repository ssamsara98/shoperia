import e from 'express';
import { addressController } from '../controllers/address.controller';
import { authMw } from '../middlewares/auth.middleware';
import { addressValidation } from '../validations/address.validation';
import { validationMw } from '../middlewares/validation.middleware';

export const addressRouter = e.Router();

addressRouter.post(
  '/create-address',
  authMw,
  addressValidation.createAddress,
  validationMw,
  addressController.createAddress,
);

addressRouter.get('/get-address-list', authMw, addressController.getAddressList);

addressRouter.get<'/get-address/:addressId', any>(
  '/get-address/:addressId',
  authMw,
  addressValidation.getAddress,
  validationMw,
  addressController.getAddress,
);

addressRouter.patch<'/update-address/:addressId', any>(
  '/update-address/:addressId',
  authMw,
  addressValidation.updateAddress,
  validationMw,
  addressController.updateAddress,
);

addressRouter.patch<'/update-address/:addressId/primary', any>(
  '/update-address/:addressId/primary',
  authMw,
  addressValidation.updateAddressPrimary,
  validationMw,
  addressController.updateAddressPrimary,
);

addressRouter.delete<'/delete-address/:addressId', any>(
  '/delete-address/:addressId',
  authMw,
  addressValidation.deleteAddress,
  validationMw,
  addressController.deleteAddress,
);

// module.exports = addressRouter;
// export default addressRouter;
