require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const users = require('./data/users');
const images = require('./data/product_images');
const products = require('./data/products');

const User = require('./src/models/user');
const ProductImage = require('./src/models/product_image');
const Product = require('./src/models/product');

dotenv.config({ debug: true });

(async (msg) => {
  console.log(msg.cyan.underline);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
})('Connecting to MongoDB');

const importData = async () => {
  try {
    await Product.deleteMany();
    await ProductImage.deleteMany();
    await User.deleteMany();

    await User.insertMany(users);
    const imgs = await ProductImage.insertMany(images);

    const sampleProducts = products.map((product) => {
      const prodImgs = imgs.map((img) => {
        return img._id;
      });
      return { ...product, images: prodImgs };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
