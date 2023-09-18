# tempmee-project

## Get started

This application utilizes the following:

- **NodeJS**
- **TypeScript**
- **Jest**
- **Prisma**
- **MongoDB**
- **Express**

1. Clone this repository
2. Install project dependencies using `npm i` or `yarn`
3. Define a `.env` file. A demo version exists as `.env.demo`. Just remove the `.demo` and specify your `PORT` and your MongoDB `DATABASE_URL`
4. Build the application using `npm run build` or `yarn build`
5. Test the application using `npm run test` or `yarn test`
6. Run the application in developer mode using `npm run dev` or `yarn dev`
7. Run the application using `npm start` or `yarn start`

**Example .env**
```
PORT=8080
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

# API

## Routes

### User `/users`

**Create a user**
`POST /users`

Sending a `POST` request to the `/users` endpoint will create a user account. _The password will not be hashed; please use test data only._

Request:
```
  curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{\
      "email": "john.doe@test.com",\
      "password": "testpassword"\
    }' \
    http://localhost:{port}/users
```

Response:

```
  {
    "address": null,
    "id": "6508a8b2d5415ec7e9c14de5",
    "password": "testpassword",
    "email": "john.doe@test.com",
    "name": null
  }
  {"address":null,"id":"6508a8b6d5415ec7d9c14de6","password":"testpassword","email":"test1@rosslibby.com","name":null}
```

Params:
  - `email`: string, required
  - `password`: string, required
Headers:
  - `Content-Type: application/json`

**View order history**
`GET /users/orders`

Sending a `GET` request to the `/users/orders` endpoint will respond with a list of the specified user's orders. Pass the `useremail` header to specify the user account for which orders are requested.

Request:
```
  curl http://localhost:{port}/users/orders \
    -H 'useremail: john.doe@test.com'
```

Headers:
  - `useremail: {email_address}`

**View list of books**
`GET /books`

Sending a `GET` request to the `/books` endpoint will return a list of all available books.

Request:
```
curl http://localhost:{port}/books
```

Response:
```
"books": [
  {
    "id": "9508a8b2d5415ec7e9c14de5",
    "title": "Call of the Wild",
    "isbn": "9788838439018",
    "price": 1899,
    "author": "Jack London",
    "orderIDs": []
  },
  {
    "id": "6608a8b2d5415ec7e9c14de5",
    "title": "Moby Dick",
    "isbn": "9780763630188",
    "price": 2700,
    "author": "Herman Melville",
    "orderIDs": []
  }
]
```

**Create an order**
`POST /orders`

Sending a `POST` request to the `/orders` endpoint will create a new order.

Request:
```
  curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{\
      "bookIDs": ["xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx"],
      "userEmail": "john.doe@test.com"
    }' \
    http://localhost:{port}/orders
```

Response:

```
  {
    "id": "6508a8b2d5415ec7e9c14de5",
    "userEmail": "john.doe@test.com",
    "books": [
      {
        "id": "9508a8b2d5415ec7e9c14de5",
        "title": "Call of the Wild",
        "isbn": "9788838439018",
        "price": 1899,
        "author": "Jack London",
        "orderIDs": [],
      },
      {
        "id": "6608a8b2d5415ec7e9c14de5",
        "title": "Moby Dick",
        "isbn": "9780763630188",
        "price": 2700,
        "author": "Herman Melville",
        "orderIDs": [],
      }
    ],
    "password": "testpassword",
    "email": "john.doe@test.com",
    "name": null
  }
  {"address":null,"id":"6508a8b6d5415ec7d9c14de6","password":"testpassword","email":"test1@rosslibby.com","name":null}
```

Params:
  - `email`: string, required
  - `password`: string, required
