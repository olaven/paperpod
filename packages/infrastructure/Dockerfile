# Several of the terraform modules this projects 
# depends on does not support M1 macs which makes 
# local development a bit weird. 
#
# This Dockerfile can be accessed through the 
# compose setup of this projects and infra code 
# can be run from there.

FROM alpine:3.15.4

# install terraform
RUN apk add gnupg curl
RUN apk add terraform

# copy over modules 
COPY ./packages/infrastructure infrastructure 
WORKDIR infrastructure
