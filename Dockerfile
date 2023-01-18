FROM node:15
WORKDIR /paperpod

COPY . /paperpod
RUN yarn install
