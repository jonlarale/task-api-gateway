# Tasks API Gateway

## Description

This is a gateway API for Task API Management: [https://github.com/jonlarale/tasks-api-management](https://github.com/jonlarale/tasks-api-management). It is responsible for authenticating the users and forwarding the requests to the Tasks API.

## Installation

```bash
$ npm install
```

## Running the app

Copy the .env.example file to .env and fill in the values. Then run the following command to start the app.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## User creation

To create a user, you need to use the following endpoint:

```bash
POST http://localhost:4001/api/v1/auth/signup
```

The body of the request should be in the following format:

```json
{
  "name": "Kamil",
  "firstSurname": "Mysliwiec",
  "email": "kamil@example.com",
  "password": "Str0ngP@ssw0rd!"
}
```

Then you can login with the following endpoint:

```bash
POST http://localhost:4001/api/v1/auth/login
```

The body of the request should be in the following format:

```json
{
  "email": "kamil@example.com",
  "password": "Str0ngP@ssw0rd!"
}
```

The response will contain a JWT token that you can use to authenticate yourself in the other endpoints. Use the token in the authorization header of each request as bearer token.

## Tasks

Once you login, you can create tasks associated with your user.
To create a task, you need to use the following endpoint:

```bash
POST http://localhost:4001/api/v1/tasks
```

The body of the request should be in the following format:

```json
{
  "title": "Learn about NestJS",
  "description": "Learn about NestJS and create a project with it",
  "status": "OPEN"
}
```

To get all the tasks associated with your user, you need to use the following endpoint:

```bash
GET http://localhost:4001/api/v1/tasks
```

To see more details about the EP's, please check the documentation.

## Documentation

The documentation for this API can be found at the following URL:

```bash
http://localhost:4001/docs
```
