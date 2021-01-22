__This project is still very much work in progress.__ More details to come.

# Paperpod 

## Sponsors 
Please consider [sponsoring](https://github.com/sponsors/olaven/) this project. 
This will allow me to give you perks in return for your gratitude!

## Assets
* [Design Workspace in Figma](https://www.figma.com/file/VSrR5BIGv7BkliMdcwvA8q/Paperpod?node-id=0%3A1)
* [Any drawings from here](https://undraw.co/illustrations)
* [Or icons from here](https://feathericons.com/)

## Setup 
* `.env` containing: 
  * GATEWAY_PORT=8080
  * API_PORT=8082
  * AUTHENTICATION_PORT=8081
  * WEB_PORT=3000
  * JWT_SECRET=some-long-secret-hush-now-please
  * MONGODB_NAME=mongoname
  * MONGODB_USERNAME=olaven
  * MONGODB_PASSWORD=mongopassword
  * MONGODB_PORT_AUTHENTICATION=5434
  * MONGODB_PORT_API=5433
  * GOOGLE_APPLICATION_CREDENTIALS=/paperpod/service-account.json 
* `docker-compose up -d`
