FROM buildkite/puppeteer
COPY . /paperpod
WORKDIR /paperpod 
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable"
RUN yarn 
