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
