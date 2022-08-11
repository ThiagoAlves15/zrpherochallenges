# syntax=docker/dockerfile:1
FROM ruby:3.0.3
USER $user
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /zrpherochallenge/onu_api
RUN mkdir -p /zrpherochallenge/onu_painel
RUN chown -Rh $user:$user /zrpherochallenge
WORKDIR /zrpherochallenge/onu_api
COPY Gemfile /zrpherochallenge/onu_api/Gemfile
COPY Gemfile.lock /zrpherochallenge/onu_api/Gemfile.lock
RUN bundle install
COPY . /zrpherochallenge/onu_api

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]