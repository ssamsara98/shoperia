# Database Models

## User

```js
const User = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  name: "string",
  email: "string",
  username: "string",
  password: "string",
  admin: "boolean",
  avatar: "string",
  sexType: "enum string",
  birthdate: "date",
};
```

## Product

```js
const product = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  name: "string",
  images: ["mongoId -> productImage"],
  price: "number",
  stock: "number",
  description: "string",
  condition: "enum string",
};
```

## Product Image

```js
const productImage = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  uuidv4: "string",
  filepath: "string",
  filename: "string",
  type: "string",
};
```

## Cart

```js
const cart = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  user: "string",
  product: "string",
  quantity: "string",
};
```

## Address

```js
const address = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  user: "mongoId -> user",
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
    postalCode: "string",
  },
};
```

## Order

```js
const order = {
  _id: "mongoId",
  createdAt: "date",
  updatedAt: "date",
  state: "string",
  buyer: "mongoId -> user",
  items: [
    {
      product: "mongoId -> product",
      name: "string",
      quantity: "number",
      price: "number",
      totalPrice: "number",
      images: ["mongoId -> productImage"],
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
      postalCode: "number",
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
  paymentType: "string",
};
```
