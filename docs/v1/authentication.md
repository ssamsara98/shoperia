### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Authentication

- _`POST`_ [Register](#register)
- _`POST`_ [Login](#login)
- _`POST`_ [Logout](#logout)

---

## Register

- **Method** `POST`
- **URL** `/api/v1/auth/register`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "name": "string",
    "email": "string",
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "token": "string",
      "user": {
        "_id": "mongoId",
        "id": "mongoId",
        "name": "string",
        "email": "string",
        "username": "string",
        "admin": "boolean",
        "avatar": "string",
        "birthdate": "date",
        "sexType": "string",
        "password": "string",
        "createdAt": "date",
        "updatedAt": "date",
        "__v": 0
      }
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Login

- **Method** `POST`
- **URL** `/api/v1/auth/login`
- **Query Params** `None`
- **Body Params**
  ```json
  {
    "userSession": "string",
    "password": "string"
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "token": "string",
      "user": {
        "_id": "mongoId",
        "id": "mongoId",
        "name": "string",
        "email": "string",
        "username": "string",
        "birthdate": "date",
        "sexType": "string",
        "avatar": "string",
        "password": "string",
        "createdAt": "date",
        "updatedAt": "date",
        "__v": 0
      }
    },
    "meta": {
      "status": 200
    }
  }
  ```

---

## Logout

- **Method** `POST`
- **URL** `/api/v1/auth/login`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response** `204 (No Content)`
