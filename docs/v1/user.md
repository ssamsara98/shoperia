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
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "_id": "mongo_id",
      "id": "mongo_id",
      "name": "string",
      "email": "string",
      "username": "string",
      "admin": "boolean",
      "avatar": "string",
      "birthdate": "date",
      "sex_type": "date",
      "created_at": "string",
      "updated_at": "string"
    },
    "meta": {
      "status": 200
    }
  }
  ```

---
