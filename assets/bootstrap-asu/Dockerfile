
ARG RUBY_VERSION=2
ARG NODE_VERSION=8

FROM starefossen/ruby-node:${RUBY_VERSION}-${NODE_VERSION}

MAINTAINER nathan.rollins@asu.edu

RUN apt-get update -qq && \
    gem install bundler


# Define where our application will live inside the image
ENV APP_ROOT /app

# Create application home.
RUN mkdir -p $APP_ROOT

# Set our working directory inside the image
WORKDIR $APP_ROOT

COPY Gemfile Gemfile.lock package.json yarn.lock $APP_ROOT/

# Cache gems
RUN bundle install

# Cache node_modules
RUN yarn install

# Copy the application into image
COPY . $APP_ROOT/

VOLUME /app

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
