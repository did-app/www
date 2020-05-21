FROM jekyll/jekyll:4.0.0

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install || echo "-------------------------------- BUNDLE exited with unexpected status" $?
