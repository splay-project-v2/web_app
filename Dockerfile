FROM ruby:2.5.3-slim
LABEL Description="Splay - WebApp - Web application for Splay"

RUN apt-get update -qq && apt-get install -y --no-install-recommends \
    build-essential libpq-dev nodejs
RUN apt-get install -y default-libmysqlclient-dev

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile* ./
RUN bundle install
COPY . .
EXPOSE 80
CMD ["rails", "server", "-p", "80", "-b", "0.0.0.0"]