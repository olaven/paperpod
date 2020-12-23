FROM node:14 
COPY . /instapod
WORKDIR /instapod
RUN ls 
RUN yarn 


