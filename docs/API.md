### [&laquo; Home](../README.md)

# Shoperia API

---

## Resources

- [Shoperia Authentication API](v1/authentication.md)
- [Shoperia User API](v1/user.md)
- [Shoperia Address API](v1/address.md)
- [Shoperia Upload API](v1/upload.md)
- [Shoperia Product API](v1/product.md)
- [Shoperia Cart API](v1/cart.md)

---

## Template

<_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

<details>

<summary>More...</summary>

- **Method**

  <_The request type_>

  `GET` | `POST` | `PUT` | `PATCH` | `DELETE`

- **URL**

  <_The URL Structure (path only, no root url)_>

- **Query Params**

  <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._>

  **Required:**

  `id=[integer]`

  **Optional:**

  `photoId=[alphanumeric]`

- **Body Params**

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

<summary>More...</summary>

```json
{
  "message": "string",
  "error": {},
  "meta": {
    "status": "number"
  }
}
```

</details>

---

## Auth

<details>

<summary>More...</summary>

- **Header**
  ```json
  {
    "Authorization": "Bearer <accessToken>"
  }
  ```
- **Error Response**
  - **Code** `401`

</details>

---
