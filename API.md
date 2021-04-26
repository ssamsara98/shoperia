# API

<details>
<summary>api v1</summary>

- auth
  - [`POST` Register](#register)
  - [`POST` Login](#login)
  - [`POST` Logout](#logout)
- users
  - [`GET` Me](#me)

</details>

## Template

<_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

<details>

- **Method**

  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`

- **URL**

  <_The URL Structure (path only, no root url)_>

- **Query Params**

  <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._>

  **Required:**

  `id=[integer]`

  **Optional:**

  `photo_id=[alphanumeric]`

- **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

- **Success Response**

  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  - **Code**`200`

  - **Content**

  ```json
  {
    "id": 12
  }
  ```

- **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  - **Code** `401`

  OR

  - **Code** `422`

- **Sample Call**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._>

- **Notes**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>

</details>

---

## Error Response

<details>

```json
{
  "message": "string",
  "stack": "string",
  "error": {},
  "metadata": {
    "status": "number"
  }
}
```

</details>

---

## Register

<details>

- **Method** `POST`
- **URL** `/auth/register`
- **Query Params** `None`
- **Data Params**
  ```json
  {
    "name": "string",
    "email": "string",
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response** `201`
  ```json
  {
    "data": {
      "token": "string",
      "user": {
        "_id": "number",
        "email": "string",
        "username": "string",
        "name": "string",
        "sex_type": "string",
        "birthdate": "date",
        "updated_at": "date",
        "created_at": "date"
      }
    },
    "metadata": {
      "status": 201
    }
  }
  ```
- **Error Response**
  - **Code** `400` | `409`

</details>

---

## Login

<details>

- **Method** `POST`
- **URL** `/auth/login`
- **Query Params** `None`
- **Data Params**
  ```json
  {
    "user_session": "string",
    "password": "string"
  }
  ```
- **Success Response** `200`
  ```json
  {
    "data": {
      "token": "string",
      "user": {
        "_id": "number",
        "email": "string",
        "username": "string",
        "name": "string",
        "sex_type": "string",
        "birthdate": "date",
        "updated_at": "date",
        "created_at": "date"
      }
    },
    "metadata": {
      "status": 200
    }
  }
  ```
- **Error Response**
  - **Code** `400` | `409`

</details>

---

## Logout

<details>

- **Method** `POST`
- **URL** `/auth/logout`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response** `204`
- **Error Response**

</details>

---

## Me

<details>

- **Auth** `Yes`
- **Method** `GET`
- **URL** `/users/me`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response** `200`
  ```json
  {
    "data": {
      "user": {
        "user": {
          "_id": "number",
          "email": "string",
          "username": "string",
          "name": "string",
          "sex_type": "string",
          "birthdate": "date",
          "updated_at": "date",
          "created_at": "date"
        }
      }
    },
    "metadata": {
      "status": 200
    }
  }
  ```
- **Error Response**

</details>

---
