### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Upload

- _`POST`_ [Upload Product](#upload-product)
- _`POST`_ [Upload Avatar](#upload-avatar)

---

## Upload Product

- **Auth** `Yes` `Admin`
- **Method** `POST`
- **URL** `/api/v1/upload/image/product`
- **Query Params** `None`
- **Body Params** `multipart/form-data`
  ```
  image=File
  ```
- **Success Response**
  ```json
  {
    "data": {
      "uploadId": "string",
      "imageUrl": "string"
    },
    "metadata": {
      "status": 201
    }
  }
  ```

---

## Upload Avatar

- **Auth** `Yes` `Admin`
- **Method** `POST`
- **URL** `/api/v1/upload/image/avatar`
- **Query Params** `None`
- **Body Params** `multipart/form-data`
  ```
  image=File
  ```
- **Success Response**
  ```json
  {
    "data": {
      "avatar": "string"
    },
    "metadata": {
      "status": 201
    }
  }
  ```
