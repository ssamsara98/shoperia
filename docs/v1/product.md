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
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": [
      {
        "_id": "mongo_id",
        "id": "mongo_id",
        "name": "string",
        "images": [
          {
            "_id": "mongo_id",
            "id": "mongo_id",
            "filename": "string",
            "filepath": "string",
            "type": "string"
          }
        ],
        "price": "number",
        "stock": "number",
        "condition": "string",
        "description": "string?",
        "created_at": "string",
        "updated_at": "string"
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
- **URL** `/api/v1/product/get-product/:product_id`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongo_id",
      "id": "mongo_id",
      "name": "string",
      "images": [
        {
          "_id": "mongo_id",
          "id": "mongo_id",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "created_at": "string",
      "updated_at": "string"
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
- **Data Params**
  ```json
  {
    "name": "string",
    "price": "number",
    "stock": "number",
    "condition": "string",
    "description": "string?",
    "image_ids": ["mongo_id"]
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongo_id",
      "id": "mongo_id",
      "name": "string",
      "images": [
        {
          "_id": "mongo_id",
          "id": "mongo_id",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "created_at": "string",
      "updated_at": "string"
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
- **URL** `/api/v1/product/update-product/:product_id`
- **Query Params** `None`
- **Data Params**
  ```json
  {
    "name": "string",
    "price": "number",
    "stock": "number",
    "condition": "string",
    "description": "string?",
    "image_ids": ["mongo_id"]
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongo_id",
      "id": "mongo_id",
      "name": "string",
      "images": [
        {
          "_id": "mongo_id",
          "id": "mongo_id",
          "filename": "string",
          "filepath": "string",
          "type": "string"
        }
      ],
      "price": "number",
      "stock": "number",
      "condition": "string",
      "description": "string?",
      "created_at": "string",
      "updated_at": "string"
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
- **URL** `/api/v1/product/delete-product/:product_id`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response** `204 (No Content)`

---
