#Fikse services: 
# * ha med typedefs og typescript i prod 
# * legge in `environment:`-entries i stack.yml
# * eksportere variablene som trengs her  

## TODO: Figure out how to pick up these variables from Github Secrets 

env \
    GATEWAY_PORT=8080 \
    WEB_PORT=3000 \
    API_PORT=8081 \
    AUTHENTICATION_PORT=8082 \
    JWT_SECRET="JWT SECRET - Generate this randomly" \
    MONGODB_NAME=$MONGODB_NAME \ # these do not work rn, as no mongo is set
    MONGODB_USERNAME=$MONGODB_USERNAME \ # these do not work rn, as no mongo is set
    MONGODB_PASSWORD=$MONGODB_PASSWORD \ # these do not work rn, as no mongo is set
    MONGODB_HOST=$MONGODB_HOST \ # these do not work rn, as no mongo is set
    MONGODB_PORT=$MONGODB_PORT \ # 27017 \ # these do not work rn, as no mongo is set
    GOOGLE_APPLICATION_CREDENTIALS=service-account.json \ 
    docker stack deploy -c stack.yml paperpod

# export GATEWAY_PORT=8080
# export WEB_PORT=3000
# export API_PORT=8081
# export AUTHENTICATION_PORT=8082
# docker stack deploy -c ./stack.yml paperpod