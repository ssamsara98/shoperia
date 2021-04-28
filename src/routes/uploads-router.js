const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const s3Storage = require('multer-s3');
const createHttpError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

const uploadsRouter = express.Router();
const imageBucket = `${process.env.AWS_S3_BUCKET}/image`;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketStorage = s3Storage({
  s3,
  bucket: imageBucket,
  acl: 'public-read',
  contentType: s3Storage.AUTO_CONTENT_TYPE,
  metadata(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, `products/${uuidv4()}/${nanoid(32)}.${extension}`);
  },
});
const upload = multer({
  storage: bucketStorage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter(req, file, cb) {
    if (!new RegExp('image/(jpg|jpeg|png)').test(file.mimetype))
      return cb(createHttpError(400, 'Image must be jpg|jpeg|png'));
    return cb(null, true);
  },
});

const uploadSingleImage = async (req, res, next) => {
  return upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(createHttpError(400, err));
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

uploadsRouter.post('/image/product', uploadSingleImage, async (req, res, next) => {
  try {
    res.status(201);
    const result = {
      data: {
        file: req.file,
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

module.exports = uploadsRouter;
