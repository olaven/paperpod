FROM node:14 
COPY . /instapod
WORKDIR /instapod
#RUN yarn # Rather running this in container to compile on the same OS as runtime


