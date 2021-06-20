### [&laquo; Home](../../README.md)

### [&laquo; API](../API.md)

# Address

- _`POST`_ [Create Address](#create-address)
- _`GET`_ [Get Address List](#get-address-list)
- _`GET`_ [Get Address](#get-address)
- _`PATCH`_ [Update Address](#update-address)
- _`PATCH`_ [Update Address Primary](#update-address-primary)
- _`DELETE`_ [Delete Address](#delete-address)

---

## Create Address

- **Auth** `Yes`
- **Method** `POST`
- **URL** `/api/v1/address/create-address`
- **Query Params** `None`
- **Data Params** `None`
  ```json
  {
    "title": "string",
    "name": "string",
    "phone": "string mobilephone id-ID",
    "detail": {
      "province": "string",
      "city": "string",
      "district": "string",
      "address": "string",
      "postal_code": "number"
    }
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "id": "string",
      "title": "string",
      "name": "string",
      "phone": "string mobilephone id-ID",
      "primary": "boolean",
      "detail": {
        "country": "string",
        "province": "string",
        "city": "string",
        "district": "string",
        "address": "string",
        "postal_code": "number"
      }
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Get Address List

- **Auth** `Yes`
- **Method** `GET`
- **URL** `/api/v1/address/get-address-list`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": [
      {
        "id": "string",
        "title": "string",
        "name": "string",
        "phone": "string mobilephone id-ID",
        "primary": "boolean",
        "detail": {
          "country": "string",
          "province": "string",
          "city": "string",
          "district": "string",
          "address": "string",
          "postal_code": "number"
        }
      }
    ],
    "meta": {
      "status": 200
    }
  }
  ```

---

## Get Address

- **Auth** `Yes`
- **Method** `GET`
- **URL** `/api/v1/address/get-address/:address_id`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "id": "string",
      "title": "string",
      "name": "string",
      "phone": "string mobilephone id-ID",
      "primary": "boolean",
      "detail": {
        "country": "string",
        "province": "string",
        "city": "string",
        "district": "string",
        "address": "string",
        "postal_code": "number"
      }
    },
    "meta": {
      "status": 200
    }
  }
  ```

---

## Update Address

- **Auth** `Yes`
- **Method** `PATCH`
- **URL** `/api/v1/address/update-address/:address_id`
- **Query Params** `None`
- **Data Params** `None`
  ```json
  {
    "title": "string",
    "name": "string",
    "phone": "string mobilephone id-ID",
    "detail": {
      "province": "string",
      "city": "string",
      "district": "string",
      "address": "string",
      "postal_code": "number"
    }
  }
  ```
- **Success Response**
  ```json
  {
    "data": {
      "id": "string",
      "title": "string",
      "name": "string",
      "phone": "string mobilephone id-ID",
      "primary": "boolean",
      "detail": {
        "country": "string",
        "province": "string",
        "city": "string",
        "district": "string",
        "address": "string",
        "postal_code": "number"
      }
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Update Address Primary

- **Auth** `Yes`
- **Method** `PATCH`
- **URL** `/api/v1/address/update-address/:address_id/primary`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response**
  ```json
  {
    "data": {
      "id": "string",
      "title": "string",
      "name": "string",
      "phone": "string mobilephone id-ID",
      "primary": "boolean",
      "detail": {
        "country": "string",
        "province": "string",
        "city": "string",
        "district": "string",
        "address": "string",
        "postal_code": "number"
      }
    },
    "meta": {
      "status": 201
    }
  }
  ```

---

## Delete Address

- **Auth** `Yes`
- **Method** `DELETE`
- **URL** `/api/v1/address/delete-address/:address_id`
- **Query Params** `None`
- **Data Params** `None`
- **Success Response** `204 (No Content)`

---
