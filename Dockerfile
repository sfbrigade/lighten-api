FROM heroku/python:3
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y jq && apt-get clean
