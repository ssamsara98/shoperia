# Database Models

## User

```js
const user = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  name: "string",
  email: "string",
  username: "string",
  password: "string",
  admin: "boolean",
  avatar: "string",
  sex_type: "enum string",
  birthdate: "date",
};
```

## Product

```js
const product = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  name: "string",
  images: ["mongo_id -> product_image"],
  price: "number",
  stock: "number",
  description: "string",
  condition: "enum string",
};
```

## Product Image

```js
const product_image = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  uuidv4: "string",
  filepath: "string",
  filename: "string",
  type: "string",
};
```

## Cart

```js
const cart = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  user: "string",
  product: "string",
  quantity: "string",
};
```

## Address

```js
const address = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  user: "mongo_id -> user",
  title: "string",
  name: "string",
  phone: "string",
  primary: "boolean",
  detail: {
    country: "string",
    province: "string",
    city: "string",
    district: "string",
    address: "string",
    postal_code: "string",
  },
};
```

## Order

```js
const order = {
  _id: "mongo_id",
  created_at: "date",
  updated_at: "date",
  state: "string",
  buyer: "mongo_id -> user",
  items: [
    {
      product: "mongo_id -> product",
      name: "string",
      quantity: "number",
      price: "number",
      total_price: "number",
      images: ["mongo_id -> product_image"],
    },
  ],
  shipment: {
    consignee: {
      name: "string",
      phone: "string",
      country: "string",
      province: "string",
      city: "string",
      district: "string",
      address: "string",
      postal_code: "number",
    },
    courier: {
      carrier: "string",
      service: "string",
      receipt: "string",
    },
  },
  amount: {
    total: "number",
    items: "number",
    shipping: "number",
  },
  payment_type: "string",
};
```
