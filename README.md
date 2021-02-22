# Vie

## Dependencies

- Docker
- NodeJS LTS(14) (If you're using [nvm](https://github.com/nvm-sh/nvm), running `nvm use` after entering the project directory, it will download and use node version specified in `.npmrc`)
- [yarnpkg](https://yarnpkg.com/) (`npm i -g yarn` to install)

## Running the database

- set environment variables `DB_USER` and `DB_PASSWORD` to the desired username and password for the Database.
- run `docker-compose -f docker-compose-infra.yml up -d` to start the database instance.

## Running the application

- copy the file `.env.example` as `.env` and edit it to add the database username and password, and, if needed, change the port on which the application runs on.
- run `yarn` to install all the dependencies
- run `yarn dev` to start the application (can be accessed on `http://localhost:8000`, or a different port if changed). The application will restart everytime source code is updated to apply the changes made.
