### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Product

- _`GET`_ [Get Product List](#get-product-list)
- _`GET`_ [Get Product](#get-product)
- _`POST`_ [Add Product](#add-product)
- _`PATCH`_ [Update Product](#update-product)
- _`DELETE`_ [Delete Product](#delete-product)

---

## Get Product List

- **Method** `GET`
- **URL** `/api/v1/product/get-product-list`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": [
      {
        "_id": "mongoId",
        "id": "mongoId",
        "name": "string",
        "images": [
          {
            "_id": "mongoId",
            "id": "mongoId",
            "filename": "string",
            "filepath": "string",
            "type": "string"
          }
        ],
        "price": "number",
        "stock": "number",
        "condition": "string",
        "description": "string?",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "meta": {
      "status": 200
    }
  }
  ```

---

## Get Product

- **Method** `GET`
- **URL** `/api/v1/product/get-product/:productId`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongoId",
      "id": "mongoId",
      "name": "string",
      "images": [
        {
          "_id": "mongoId",
          "id": "mongoId",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---

## Add Product

- **Auth** `Yes` `Admin`
- **Method** `POST`
- **URL** `/api/v1/product/add-product`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "name": "string",
    "price": "number",
    "stock": "number",
    "condition": "string",
    "description": "string?",
    "imageIds": ["mongoId"]
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongoId",
      "id": "mongoId",
      "name": "string",
      "images": [
        {
          "_id": "mongoId",
          "id": "mongoId",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Update Product

- **Auth** `Yes` `Admin`
- **Method** `PATCH`
- **URL** `/api/v1/product/update-product/:productId`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "name": "string",
    "price": "number",
    "stock": "number",
    "condition": "string",
    "description": "string?",
    "imageIds": ["mongoId"]
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongoId",
      "id": "mongoId",
      "name": "string",
      "images": [
        {
          "_id": "mongoId",
          "id": "mongoId",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---

## Delete Product

- **Auth** `Yes` `Admin`
- **Method** `DELETE`
- **URL** `/api/v1/product/delete-product/:productId`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response** `204 (No Content)`

---
