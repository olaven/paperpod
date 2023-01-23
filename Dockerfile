FROM node:19
WORKDIR /paperpod

COPY . /paperpod
RUN yarn install
