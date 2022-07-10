# NestJS movie API

This repository contains a movie API for creating movies from a 3rd party API [OMDb API](https://www.omdbapi.com/). The code is divided into two microservices: Authentication and Movie.

The Authentication service handles user authentication using JWT tokens.

The Movie service contains two endpoints: create movies and list movies. Both endpoints work for the current authenticated user. 

The architecture is based on [Onion Architecture](https://www.codeguru.com/csharp/understanding-onion-architecture/) using [CQRS](https://martinfowler.com/bliki/CQRS.html) to handle inputs via command objects and outputs via query objects.

## Technologies used

* [Node.js](https://nodejs.org/en/)
* [NestJS](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [mongo-express](https://github.com/mongo-express/mongo-express)
* [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Setup instructions

1. Clone the repository using `git clone git@github.com:fuzulus/movie-api.git`
1. Run `cp .env.dist .env` and enter values for `JWT_SECRET` and `OMDB_API_KEY`
    1. `JWT_SECRET` - the secret used for encoding JWTs
    1. `OMDB_API_KEY` - your API key from the 3rd party provider sent to your e-mail address after registering
1. Run `docker-compose up -d`
1. That's it! You can start using the API via Postman with the `movie-api.postman_collection.json` collection.

The authentication provides two users for usage:

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## API documentation

### Authenticate user

Endpoint: `POST /v1/auth`

Body:
```json
{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiQmFzaWMgVGhvbWFzIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjU3NDgzNDg4LCJleHAiOjE2NTc0ODUyODgsImlzcyI6Imh0dHBzOi8vd3d3Lm5ldGd1cnUuY29tLyIsInN1YiI6IjEyMyJ9.qi0jy7VRssF3WKzxkggmn_6PMOBQq2Lw1ijSgyXXlfQ"
}
```

### Decode token

Endpoint: `GET /v1/token`

Required headers:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiQmFzaWMgVGhvbWFzIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjU3NDgzNDg4LCJleHAiOjE2NTc0ODUyODgsImlzcyI6Imh0dHBzOi8vd3d3Lm5ldGd1cnUuY29tLyIsInN1YiI6IjEyMyJ9.qi0jy7VRssF3WKzxkggmn_6PMOBQq2Lw1ijSgyXXlfQ
```

Response:

```json
{
    "userId": "123",
    "role": "basic"
}
```

### List movies

Endpoint: `GET /v1/movies`

Required headers: 

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiQmFzaWMgVGhvbWFzIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjU3NDgzNDg4LCJleHAiOjE2NTc0ODUyODgsImlzcyI6Imh0dHBzOi8vd3d3Lm5ldGd1cnUuY29tLyIsInN1YiI6IjEyMyJ9.qi0jy7VRssF3WKzxkggmn_6PMOBQq2Lw1ijSgyXXlfQ
```

Response:

```json
[
    {
        "id": "6dec413c-a612-4044-996e-190a1bdd3e2f",
        "userId": "123",
        "title": "Men in Black",
        "releaseDate": "02 Jul 1997",
        "genre": "Action, Adventure, Comedy",
        "director": "Barry Sonnenfeld"
    },
    {
        "id": "1d7af4ee-bfff-4902-90f4-fa85c8eaa4dc",
        "userId": "123",
        "title": "Deadpool",
        "releaseDate": "12 Feb 2016",
        "genre": "Action, Adventure, Comedy",
        "director": "Tim Miller"
    }
]
```

### Create movie

Endpoint: `POST /v1/movies`

Required headers: 

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiQmFzaWMgVGhvbWFzIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjU3NDgzNDg4LCJleHAiOjE2NTc0ODUyODgsImlzcyI6Imh0dHBzOi8vd3d3Lm5ldGd1cnUuY29tLyIsInN1YiI6IjEyMyJ9.qi0jy7VRssF3WKzxkggmn_6PMOBQq2Lw1ijSgyXXlfQ
```

Response:

```json
{
    "id": "6dec413c-a612-4044-996e-190a1bdd3e2f",
    "userId": "123",
    "title": "Men in Black",
    "releaseDate": "02 Jul 1997",
    "genre": "Action, Adventure, Comedy",
    "director": "Barry Sonnenfeld"
}
```