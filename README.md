## Movies

This is the repository for the movies API. 

### Prerequisites
To run the application, the following should be installed:

- Node.js v14+
- Docker(optional)
- Docker Compose(optional)
- Postgres
- Make utility
- Postman/Insomnia REST Clients

### Getting started
To get started with the application, clone the repository:

```bash
$ git clone git@github.com:Allan690/MovieRepo.git
```

Checkout to the root directory:

```bash
$ cd movies/
```
Install the dependencies:

```bash
$ npm install
```

Copy the variables in the `.env.example` file at the root of the project directory into a `.env` file:

```bash
cp .env.example .env
```

Replace the variables with correct variables pointing to your correct database name, host, port etc.

Then run the application:

```bash
$ npm run start:dev # start app with dev settings
OR 
$ npm run start  # start app with prod settings - set NODE_ENV to production before running this
```

Alternatively you can build with docker as follows(assuming you have compose installed):

```
$ make start # start the application
$ make stop # stop the running docker containers(postgres and Node)
$ make clean # remove dangling images
```

### Making API requests
To begin, open Postman/Curl(in terminal) and create a user using the `/signup` endpoint:

```bash
$ curl --location --request POST 'http://localhost:5000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "test2@test.com",
	"password": "testing"
}'
```
Then login the user as follows and copy the access token generated for use in subsequent requests:

```bash
$ curl --location --request POST 'http://localhost:5000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "test2@test.com",
	"password": "testing"
}'
```

You can now create a movie by making a request to the POST `/movies` endpoint as follows:

```bash
$ curl --location --request POST 'http://localhost:5000/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YWY2Mzc2YS01OTE0LTQ2MDMtODNiYS0wNjUzN2FhMzgzZjkiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNTk5NjYyMDM4LCJleHAiOjE1OTk2NjkyMzh9.SrHuJFvcHl4nZHO1JNMp0a2avSLYp4-kMeCaE38mnIM' \
--data-raw '{
	"name": "Sample movie name",
	"image": "https://movie-uri.com",
	"summary": "sample summary",
	"year": 2020
}
'
```

You can also fetch movies by calling the `GET /movies` endpoint and create a booking by making a call to the POST `/bookings` endpoint, passing in the `user id ` and `movie id ` in the request body.

``` bash
# fetching movies
$ curl --location --request GET 'http://localhost:5000/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YWY2Mzc2YS01OTE0LTQ2MDMtODNiYS0wNjUzN2FhMzgzZjkiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNTk5NjYyMDM4LCJleHAiOjE1OTk2NjkyMzh9.SrHuJFvcHl4nZHO1JNMp0a2avSLYp4-kMeCaE38mnIM' \
--data-raw ''

# creating a booking example
$ curl --location --request POST 'http://localhost:5000/bookings' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YWY2Mzc2YS01OTE0LTQ2MDMtODNiYS0wNjUzN2FhMzgzZjkiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNTk5NjYyMDM4LCJleHAiOjE1OTk2NjkyMzh9.SrHuJFvcHl4nZHO1JNMp0a2avSLYp4-kMeCaE38mnIM' \
  --data-raw '{
          "movieId": "557df2fb-12e5-460a-88fb-248bebe12f60",
          "userId": "f9b54467-4adb-43ac-af97-17b911eef9c6"
  }'
  {"message":"success","booking":[{"users_id":"f9b54467-4adb-43ac-af97-17b911eef9c6","users_email":"test3@test.com","movie_id":"557df2fb-12e5-460a-88fb-248bebe12f60","movie_image":"https://movie-uri.com","movie_summary":"sample summary","movie_name":"Sample movie name","movie_year":"2020","movie_createdAt":"2020-09-09T14:47:22.495Z","movie_updatedAt":"2020-09-09T14:47:22.495Z"}]}%
```

You can also fetch bookings using the `GET /bookings` endpoint.

```
curl --location --request GET 'http://localhost:5000/bookings?userId=f9b54467-4adb-43ac-af97-17b911eef9c6' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YWY2Mzc2YS01OTE0LTQ2MDMtODNiYS0wNjUzN2FhMzgzZjkiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNTk5NjYyMDM4LCJleHAiOjE1OTk2NjkyMzh9.SrHuJFvcHl4nZHO1JNMp0a2avSLYp4-kMeCaE38mnIM' \
--data-raw ''
{"message":"success","booking":[{"users_id":"f9b54467-4adb-43ac-af97-17b911eef9c6","users_email":"test3@test.com","movie_id":"557df2fb-12e5-460a-88fb-248bebe12f60","movie_image":"https://movie-uri.com","movie_summary":"sample summary","movie_name":"Sample movie name","movie_year":"2020","movie_createdAt":"2020-09-09T14:47:22.495Z","movie_updatedAt":"2020-09-09T14:47:22.495Z"}]}
```

In summary, there are the following endpoints which you can access:

```
1. Movies - POST, GET, DELETE - /movies
2. Bookings - POST, GET, DELETE - /bookings
3. Signup - POST - /signup
4. Login - POST - /login
```

