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
    MONGODB_NAME="Test database name" \ 
    MONGODB_USERNAME="test database username" \ 
    MONGODB_PASSWORD="test database password" \ 
    MONGODB_HOST="test database host" \ 
    MONGODB_PORT="test database port" \ 
    GOOGLE_APPLICATION_CREDENTIALS=service-account.json \ 
    docker stack deploy -c stack.yml paperpod
