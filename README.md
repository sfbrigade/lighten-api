# lighten

This repo contains the lighten UI and lighten API, the latter which runs on
Heroku at https://lighten-api.herokuapp.com/.

## Initial Setup

The steps here only need to be run once.

1. Install Docker for Mac, which is currently in beta at https://beta.docker.com/

1. Install the Heroku CLI

         brew install heroku

1. Clone the lighten repo

         git clone git@github.com:sfbrigade/lighten.git
         cd lighten

1. Bring up the development services

         docker-compose up -d

1. Initialize the database

         docker-compose exec api python manage.py migrate

1. Create a superuser

         docker-compose exec api python manage.py createsuperuser

1. Stop the development services

         docker-compose stop

## Development

1. Bring up the development services

         docker-compose up

1. Open the development API

         open http://localhost:8080

#### Migrations

If you make any changes to the data models, you'll need to commit migrations

    docker-compose exec api python manage.py makemigrations
    git add */migrations
    git commit

## Production

1. Deploy to Heroku

         git subtree push --prefix lighten-api heroku master

1. Open the production API

         heroku open

#### Migrations

If you made any changes to the data models, you'll need to apply migrations

    heroku run python manage.py migrate

## Documentation

For more information about using Python and Docker on Heroku, see these Dev Center articles:

- [Python on Heroku](https://devcenter.heroku.com/categories/python)
- [Local Development with Docker](https://devcenter.heroku.com/articles/local-development-with-docker)
