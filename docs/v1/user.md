### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# User

- _`GET`_ [Me](#me)

---

## Me

- **Auth** `Yes`
- **Method** `GET`
- **URL** `/api/v1/user/me`
- **Query Params** `None`
- **Body Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongoId",
      "id": "mongoId",
      "name": "string",
      "email": "string",
      "username": "string",
      "admin": "boolean",
      "avatar": "string",
      "birthdate": "date",
      "sexType": "date",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---
