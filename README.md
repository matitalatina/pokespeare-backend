[![Build Status](https://travis-ci.org/matitalatina/pokespeare-backend.svg?branch=master)](https://travis-ci.org/matitalatina/pokespeare-backend)

# PokéSpeare backend

The Shakespearean PokeDex!

## Requirements

- [Node.js 12](https://nodejs.org/).
- [Docker](https://www.docker.com/): if you want to start inside docker.

## Notes

- All the code is tested using [TDD](https://en.wikipedia.org/wiki/Test-driven_development). This helps me to create [SOLID](https://it.wikipedia.org/wiki/SOLID) code.
- There's CI/CD pipeline enabled thanks to [Travis CI](https://travis-ci.org/). This deploy goes on [https://pokespeare.herokuapp.com/](https://pokespeare.herokuapp.com/).
- If you want to see the full picture, please see the [docker compose repository](https://github.com/matitalatina/pokespeare-docker).
- I added cache on `/pokemon/{name}` endpoint to avoid 429 Too Many Request Error triggered by [Shakespeare translator](https://funtranslations.com/api/shakespeare).
- I used [Nest JS](https://nestjs.com/) framework.
- If you want to see it live, go to [https://pokespeare.mattianatali.dev/](https://pokespeare.mattianatali.dev/).
- The `Dockerfile` uses multi-stage builds to optimize space.


## Installation

```bash
$ npm install
```

## Running the app

The env variables `ALLOWED_ORIGINS=<url>,...` enable CORS on the URLs you are passing.

```bash
# development
$ npm run start

# You can see it on http://localhost:3000/

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

If you want also the frontend, please see the [PokéSpeare docker repository](https://github.com/matitalatina/pokespeare-docker).

```bash
# Build
docker build . -t pokespeare-backend --build-arg 

# Run
docker run -p 3000:3000 -e 'ALLOWED_ORIGINS=<YOUR_FRONTEND_URL>' pokespeare-backend
```
