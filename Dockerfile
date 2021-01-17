FROM node:14
WORKDIR /paperpod

COPY . /paperpod
RUN yarn 
