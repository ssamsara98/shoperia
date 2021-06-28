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
- **Data Params**
  ```json
  {
    "address_id": "string"
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "string",
      "id": "string",
      "status": "string",
      "buyer": "mongo_id",
      "items": [
        {
          "_id": "mongo_id",
          "product": "mongo_id",
          "images": ["mongo_id"],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "total_price": "number"
        }
      ],
      "shipment": {
        "address": "mongo_id",
        "consignee": {
          "name": "string",
          "phone": "string",
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postal_code": "number"
        }
      },
      "amount": {
        "total": "number",
        "items": "number",
        "shipping": "number"
      },
      "payment_type": "string",
      "created_at": "string",
      "updated_at": "string"
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
- **Data Params** `None`
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
          "sex_type": "string"
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
            "postal_code": "number"
          },
          "address": {
            "_id": "mongo_id",
            "id": "mongo_id",
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
              "postal_code": "number"
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
            "_id": "mongo_id",
            "_id": "mongo_id",
            "product": {
              "_id": "mongo_id",
              "id": "string",
              "name": "string",
              "price": "number",
              "stock": "number"
            },
            "images": [
              {
                "_id": "mongo_id",
                "id": "mongo_id",
                "type": "string",
                "filepath": "string",
                "filename": "string"
              }
            ],
            "name": "string",
            "quantity": "number",
            "price": "number",
            "total_price": "number"
          }
        ],
        "payment_type": "stripe",
        "created_at": "date",
        "updated_at": "date"
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
- **URL** `/api/v1/order/get-order/:order_id`
- **Query Params** `None`
- **Data Params** `None`
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
        "sex_type": "string"
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
          "postal_code": "number"
        },
        "address": {
          "_id": "mongo_id",
          "id": "mongo_id",
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
            "postal_code": "number"
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
          "_id": "mongo_id",
          "_id": "mongo_id",
          "product": {
            "_id": "mongo_id",
            "id": "string",
            "name": "string",
            "price": "number",
            "stock": "number"
          },
          "images": [
            {
              "_id": "mongo_id",
              "id": "mongo_id",
              "type": "string",
              "filepath": "string",
              "filename": "string"
            }
          ],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "total_price": "number"
        }
      ],
      "payment_type": "stripe",
      "created_at": "date",
      "updated_at": "date"
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
- **URL** `/api/v1/order/cancel-order/:order_id`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "string",
      "id": "string",
      "status": "string",
      "buyer": "mongo_id",
      "items": [
        {
          "_id": "mongo_id",
          "product": "mongo_id",
          "images": ["mongo_id"],
          "name": "string",
          "quantity": "number",
          "price": "number",
          "total_price": "number"
        }
      ],
      "shipment": {
        "address": "mongo_id",
        "consignee": {
          "name": "string",
          "phone": "string",
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postal_code": "number"
        }
      },
      "amount": {
        "total": "number",
        "items": "number",
        "shipping": "number"
      },
      "payment_type": "string",
      "created_at": "string",
      "updated_at": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---
