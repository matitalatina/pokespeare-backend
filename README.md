[![Build Status](https://travis-ci.org/matitalatina/pokespeare-backend.svg?branch=master)](https://travis-ci.org/matitalatina/pokespeare-backend)

# PokéSpeare backend

The Shakespearean PokeDex!

## Notes

- All the code is tested using [TDD](https://en.wikipedia.org/wiki/Test-driven_development). This helps me to create [SOLID](https://it.wikipedia.org/wiki/SOLID) code.
- There's CI/CD pipeline enable thanks to [Travis CI](https://travis-ci.org/). This deploy goes on [https://pokespeare.herokuapp.com/](https://pokespeare.herokuapp.com/).
- If you want to see the full picture, please see the [docker compose repository](https://github.com/matitalatina/pokespeare-docker).
- I used [Nest JS](https://nestjs.com/) framework.
- If you want to see it live, go to [https://pokespeare.mattianatali.dev/](https://pokespeare.mattianatali.dev/).

## Installation

```bash
$ npm install
```

## Running the app

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
