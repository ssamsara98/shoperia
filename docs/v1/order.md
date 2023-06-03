### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Order

- _`POST`_ [Place Order](#place-order)
- _`GET`_ [Get Order List](#get-order-list)
- _`GET`_ [Get Order](#get-order)
- _`PATCH`_ [Cancel Order](#cancel-order)

---

## Place Order

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/order/place-order`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "consignee": {
      "name": "string",
      "phone": "string",
      "province": "string",
      "city": "string",
      "district": "string",
      "address": "string",
      "postalCode": "number"
    },
    "courier": "string",
    "service": "string",
    "shippingCost": "number"
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "string",
      "id": "string",
      "status": "string",
      "buyer": "mongoId",
      "items": [
        {
          "_id": "mongoId",
          "product": "mongoId",
          "images": ["mongoId"],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "totalPrice": "number"
        }
      ],
      "shipment": {
        "consignee": {
          "name": "string",
          "phone": "string",
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postalCode": "number"
        },
        "courier": {
          "carrier": "string",
          "service": "string",
          "receipt": "stirng"
        }
      },
      "amount": {
        "total": "number",
        "items": "number",
        "shipping": "number"
      },
      "paymentType": "string",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Get Order List

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/order/get-order-list`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": [
      {
        "_id": "string",
        "id": "string",
        "status": "string",
        "buyer": {
          "_id": "string",
          "id": "string",
          "avatar": "string",
          "name": "string",
          "username": "string",
          "birthdate": "date",
          "sexType": "string"
        },
        "shipment": {
          "consignee": {
            "name": "string",
            "phone": "string",
            "country": "string",
            "province": "string",
            "city": "string",
            "district": "string",
            "address": "string",
            "postalCode": "number"
          },
          "address": {
            "_id": "mongoId",
            "id": "mongoId",
            "user": "string",
            "phone": "string",
            "primary": "boolean",
            "title": "string",
            "name": "string",
            "detail": {
              "country": "string",
              "province": "string",
              "city": "string",
              "district": "string",
              "address": "string",
              "postalCode": "number"
            }
          }
        },
        "amount": {
          "total": "number",
          "items": "number",
          "shipping": "number"
        },
        "items": [
          {
            "_id": "mongoId",
            "_id": "mongoId",
            "product": {
              "_id": "mongoId",
              "id": "string",
              "name": "string",
              "price": "number",
              "stock": "number"
            },
            "images": [
              {
                "_id": "mongoId",
                "id": "mongoId",
                "type": "string",
                "filepath": "string",
                "filename": "string"
              }
            ],
            "name": "string",
            "quantity": "number",
            "price": "number",
            "totalPrice": "number"
          }
        ],
        "paymentType": "stripe",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "meta": {
      "status": 200
    }
  }
  ```

---

## Get Order

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/order/get-order/:orderId`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "string",
      "id": "string",
      "status": "string",
      "buyer": {
        "_id": "string",
        "id": "string",
        "avatar": "string",
        "name": "string",
        "username": "string",
        "birthdate": "date",
        "sexType": "string"
      },
      "shipment": {
        "consignee": {
          "name": "string",
          "phone": "string",
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postalCode": "number"
        },
        "address": {
          "_id": "mongoId",
          "id": "mongoId",
          "user": "string",
          "phone": "string",
          "primary": "boolean",
          "title": "string",
          "name": "string",
          "detail": {
            "country": "string",
            "province": "string",
            "city": "string",
            "district": "string",
            "address": "string",
            "postalCode": "number"
          }
        }
      },
      "amount": {
        "total": "number",
        "items": "number",
        "shipping": "number"
      },
      "items": [
        {
          "_id": "mongoId",
          "_id": "mongoId",
          "product": {
            "_id": "mongoId",
            "id": "string",
            "name": "string",
            "price": "number",
            "stock": "number"
          },
          "images": [
            {
              "_id": "mongoId",
              "id": "mongoId",
              "type": "string",
              "filepath": "string",
              "filename": "string"
            }
          ],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "totalPrice": "number"
        }
      ],
      "paymentType": "stripe",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---

## Cancel Order

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/order/cancel-order/:orderId`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "string",
      "id": "string",
      "status": "string",
      "buyer": "mongoId",
      "items": [
        {
          "_id": "mongoId",
          "product": "mongoId",
          "images": ["mongoId"],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "totalPrice": "number"
        }
      ],
      "shipment": {
        "address": "mongoId",
        "consignee": {
          "name": "string",
          "phone": "string",
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postalCode": "number"
        }
      },
      "amount": {
        "total": "number",
        "items": "number",
        "shipping": "number"
      },
      "paymentType": "string",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---
