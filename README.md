# lighten-api

This repo contains the Lighten API which runs on Heroku at https://lighten-api.herokuapp.com/.

## Initial Setup

The steps here only need to be run once.

1. Install Docker for Mac from https://docs.docker.com/docker-for-mac/

1. Install the Heroku CLI

         brew install heroku

1. Clone the `lighten-api` repo

         git clone git@github.com:sfbrigade/lighten-api.git
         cd lighten-api

1. Create an `.env` file for holding environment variables

         echo "SECRET_KEY=$(openssl rand -hex 24)" > .env

1. Bring up the development services

         docker-compose up -d

1. Initialize the database

         docker-compose exec api python manage.py migrate

1. Load initial data via fixtures

         docker-compose exec api python manage.py loaddata lighten_api/organization

1. Create a superuser

         docker-compose exec api python manage.py createsuperuser

1. Stop the development services

         docker-compose stop

## Development

1. Bring up the development services

         docker-compose up --build

   The `--build` option ensures any new dependencies are included.

1. Open the development API

         open http://localhost:8080

#### Migrations

If you make any changes to the data models, you'll need to commit migrations

    docker-compose exec api python manage.py makemigrations
    git add */migrations
    git commit

## Production

1. Deploy to Heroku

         git push heroku master

1. Open the production API

         heroku open

#### Migrations

If you made any changes to the data models, you'll need to apply migrations

    heroku run python manage.py migrate

## How to pull all json files into database (DEPRECATED)

```
docker-compose run api python manage.py lightenclitool --writetodb  data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json
```

## Documentation

For more information about using Python and Docker on Heroku, see these Dev Center articles:

- [Python on Heroku](https://devcenter.heroku.com/categories/python)
- [Local Development with Docker](https://devcenter.heroku.com/articles/local-development-with-docker)
