#Fikse services: 
# * ha med typedefs og typescript i prod 
# * legge in `environment:`-entries i stack.yml
# * eksportere variablene som trengs her  

env \
    GATEWAY_PORT=8080 \
    WEB_PORT=3000 \
    API_PORT=8081 \
    AUTHENTICATION_PORT=8082 \
    docker stack deploy -c stack.yml paperpod

# export GATEWAY_PORT=8080
# export WEB_PORT=3000
# export API_PORT=8081
# export AUTHENTICATION_PORT=8082
# docker stack deploy -c ./stack.yml paperpod