FROM jekyll/jekyll:4.0.0

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install
