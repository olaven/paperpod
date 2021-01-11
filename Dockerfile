FROM node:14 
COPY . /paperpod
WORKDIR /paperpod
RUN yarn install 


