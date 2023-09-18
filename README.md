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
```bash
PORT=8080
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

# API

## Routes

## User `/users`

**Create a user**
```bash
POST /users
```

Sending a `POST` request to the `/users` endpoint will create a user account. _The password will not be hashed; please use test data only._

Request:
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{\
    "email": "john.doe@test.com",\
    "password": "testpassword"\
  }' \
  http://localhost:{port}/users
```

Response:

```json
{
  "address": null,
  "id": "6508a8b2d5415ec7e9c14de5",
  "password": "testpassword",
  "email": "john.doe@test.com",
  "name": null
}
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
```bash
curl http://localhost:{port}/users/orders \
  -H 'useremail: john.doe@test.com'
```

Headers:
  - `useremail: {email_address}`

## User `/users`

**View list of books**
```bash
GET /books
```

Sending a `GET` request to the `/books` endpoint will return a list of all available books.

Request:
```bash
curl http://localhost:{port}/books
```

Response:
```json
[
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

**Get book by ID**
```bash
GET /books/{id}
```

Sending a `GET` request to `/books/{id}`, specifying the ID of an existing book, will return all of that book's data.

Request:
```bash
curl http://localhost:{port}/books/65085f739542369c3328307d
```

Response:
```json
{
  "id": "65085f739542369c3328307d",
  "title": "Call of the Wild",
  "isbn": "9788838439018",
  "price": 1899,
  "author": "Jack London",
  "orderIDs": []
},
```

## Order `/orders`

**Create an order**
```bash
POST /orders
```

Sending a `POST` request to the `/orders` endpoint will create a new order.

Request:
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{\
    "bookIDs": ["xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx"],
    "userEmail": "john.doe@test.com"
  }' \
  http://localhost:{port}/orders
```

Response:

```json
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
```

Params:
  - `email`: string, required
  - `password`: string, required

**Get a user's order history**
```bash
GET /orders
```

Sending a `GET` request to `/orders`, specifying the user's email as the `useremail` header, will return all orders for the given user.

Request:
```bash
curl http://localhost:{port}/orders \
  -H 'useremail: john.doe@test.com'
```

Response:
```json
[
  {
    "id": "6508a8b2d5415ec7e9c14de5",
    "userEmail": "john.doe@test.com",
    "bookIDs": ["65085f739542369c3328307d"],
    "books": [
      {
        "id": "65085f739542369c3328307d",
        "title": "Call of the Wild",
        "isbn": "9788838439018",
        "price": 1899,
        "author": "Jack London",
        "orderIDs": []
      }
    ],
    "total": 1899,
    "createdAt": "2023-09-18T21:05:30.520Z"
  },
  {
    "id": "6708a8b2d5415ec7e9c14de5",
    "userEmail": "john.doe@test.com",
    "bookIDs": ["65085f739542369c3328307e"],
    "books": [
      {
        "id": "65085f739542369c3328307e",
        "title": "Moby Dick",
        "isbn": "9780763630188",
        "price": 2700,
        "author": "Herman Melville",
        "orderIDs": []
      }
    ],
    "total": 2700,
    "createdAt": "2023-09-17T14:05:28.220Z"
  }
]
```

Headers:
  - `useremail: john.doe@test.com`