import { body, param } from 'express-validator';

class AddressValidation {
  createAddress = [
    body('title').isString(),
    body('name').isString(),
    body('telephone').isMobilePhone('id-ID'),
    body('detail.province').isString(),
    body('detail.city').isString(),
    body('detail.district').isString(),
    body('detail.address').isString(),
    body('detail.postalCode').isNumeric({ locale: 'id-ID', no_symbols: true }),
  ];

  getAddress = [param('addressId').isMongoId()];

  updateAddress = [
    param('addressId').isMongoId(),
    body('title').isString(),
    body('name').isString(),
    body('telephone').isMobilePhone('id-ID'),
    body('detail.province').isString(),
    body('detail.city').isString(),
    body('detail.district').isString(),
    body('detail.address').isString(),
    body('detail.postalCode').isNumeric({ locale: 'id-ID', no_symbols: true }),
  ];

  updateAddressPrimary = [param('addressId').isMongoId()];

  deleteAddress = [param('addressId').isMongoId()];
}

export const addressValidation = new AddressValidation();
