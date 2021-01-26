env \
    GATEWAY_PORT=8080 \
    WEB_PORT=3000 \
    API_PORT=8081 \
    AUTHENTICATION_PORT=8082 \
    JWT_SECRET="jwt-token-secret-stack" \
    MONGODB_NAME=$MONGODB_NAME \ # these do not work rn, as no mongo is set
    MONGODB_USERNAME=$MONGODB_USERNAME \ # these do not work rn, as no mongo is set
    MONGODB_PASSWORD=$MONGODB_PASSWORD \ # these do not work rn, as no mongo is set
    MONGODB_HOST=$MONGODB_HOST \ # these do not work rn, as no mongo is set
    MONGODB_PORT=$MONGODB_PORT \ # 27017 \ # these do not work rn, as no mongo is set
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    docker stack deploy -c stack.yml paperpod
