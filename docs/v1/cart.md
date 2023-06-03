### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Cart

- _`POST`_ [Add Cart Item](#add-cart-item)
- _`GET`_ [Get Cart](#get-cart)
- _`DELETE`_ [Delete Cart Item](#delete-cart-item)

---

## Add Cart Item

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/cart/add-cart-item`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "productId": "mongoId",
    "quantity": "number",
    "modified": "boolean?"
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongoId",
      "id": "mongoId",
      "user": "mongoId",
      "product": "mongoId",
      "quantity": "number",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "meta": {
      "status": "201 | 200 | 204"
    }
  }
  ```

---

## Get Cart

- **Auth** `Yes`
- **Method** `GET`
- **URL** `/api/v1/cart/get-cart`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "productId": "mongoId"
  }
  ```
- **Success Response**
  ```json
  {
    "data": [
      {
        "_id": "mongoId",
        "id": "mongoId",
        "quantity": "number",
        "product": {
          "_id": "number",
          "id": "number",
          "name": "string",
          "price": "number",
          "stock": "number",
          "images": [
            {
              "_id": "mongoId",
              "id": "mongoId",
              "type": "string",
              "filename": "string",
              "filepath": "string"
            }
          ]
        },
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

## Delete Cart Item

- **Auth** `Yes`
- **Method** `DELETE`
- **URL** `/api/v1/cart/delete-cart-item`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "productId": "mongoId"
  }
  ```
- **Success Response** `204 (No Content)`

---
