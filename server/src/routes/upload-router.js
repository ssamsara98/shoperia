const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const s3Storage = require('multer-s3');
const createHttpError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const sharp = require('sharp');

const ProductImage = require('../models/product_image');
const authMw = require('../middlewares/auth-mw');

const uploadRouter = express.Router();
const imageBucket = `${process.env.AWS_BUCKET}/img`;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

const productStorage = s3Storage({
  s3,
  bucket: imageBucket,
  acl: 'public-read',
  serverSideEncryption: 'AES256',
  contentType: s3Storage.AUTO_CONTENT_TYPE,
  metadata(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, `product/${uuidv4()}/${nanoid(32)}.${extension}`);
  },
});
const uploadProduct = multer({
  storage: productStorage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter(req, file, cb) {
    if (!new RegExp('image/(jpg|jpeg|png)').test(file.mimetype))
      return cb(createHttpError(400, 'Image must be jpg|jpeg|png'));
    return cb(null, true);
  },
});
const uploadProductImage = async (req, res, next) => {
  return uploadProduct.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(createHttpError(400, 'Maximum file size is 2MB', err));
      }
    }
    if (err) {
      // An unknown error occurred when uploading.
      return next(err);
    }
    // Everything went fine.
    return next();
  });
};

uploadRouter.post('/image/product', uploadProductImage, async (req, res, next) => {
  try {
    const { key } = req.file;
    const splitedKey = key.split('/');
    const filename = splitedKey[splitedKey.length - 1];
    const filepath = splitedKey.slice(0, -1).join('/');
    const uuidv4 = splitedKey[1];

    const newProductImage = new ProductImage({
      filename,
      filepath,
      uuidv4,
    });
    await newProductImage.save();

    res.status(201);
    const result = {
      data: {
        upload_id: newProductImage.id,
        image_url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/img/${newProductImage.filepath}/${newProductImage.filename}`,
      },
      metadata: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

const uploadAvatar = multer({
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter(req, file, cb) {
    if (!new RegExp('image/(jpg|jpeg|png)').test(file.mimetype))
      return cb(createHttpError(400, 'Image must be jpg|jpeg|png'));
    return cb(null, true);
  },
});
const uploadAvatarImage = async (req, res, next) => {
  return uploadAvatar.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(createHttpError(400, 'Maximum file size is 2MB', err));
      }
    }
    if (err) {
      // An unknown error occurred when uploading.
      return next(err);
    }
    // Everything went fine.
    return next();
  });
};

uploadRouter.post('/image/avatar', authMw, uploadAvatarImage, async (req, res, next) => {
  try {
    const avt = await sharp(req.file.buffer).resize(300, 300).webp().toBuffer();

    const Key = `img/avatar/${nanoid(32)}.webp`;
    await s3
      .putObject({
        Body: avt,
        Bucket: process.env.AWS_BUCKET,
        Key,
        ContentType: 'image/webp',
        ACL: 'public-read',
      })
      .promise();

    await req.user.update({
      $set: {
        avatar: Key,
      },
    });

    res.status(201);
    const result = {
      data: {
        avatar: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${Key}`,
      },
      metadata: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = uploadRouter;
