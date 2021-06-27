**This project is still very much work in progress.** More details to come.

# Paperpod

## Sponsors

Please consider [sponsoring](https://github.com/sponsors/olaven/) this project.
This will allow me to give you perks in return for your gratitude!

## Assets

- [Design Workspace in Figma](https://www.figma.com/file/VSrR5BIGv7BkliMdcwvA8q/Paperpod?node-id=0%3A1)
- [Any drawings from here](https://undraw.co/illustrations)
- [Or icons from here](https://feathericons.com/)

## Setup

- `.env` containing:
  - GATEWAY_PORT=8080
  - API_PORT=8082
  - AUTHENTICATION_PORT=8081
  - WEB_PORT=3000
  - JWT_SECRET=some-long-secret-hush-now-please
  - PGDATABASE_API=some-database-name
  - PGUSER_API=some-different-database-name
  - PGPASSWORD_API=some-secret-password
  - PGDATABASE_AUTHENTICATION=name-of-database
  - PGUSER_AUTHENTICATION=some-username
  - PGPASSWORD_AUTHENTICATION=some-password
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - STRIPE_PUBLISHABLE_KEY
  - STRIPE_SECRET_KEY
- `docker compose up -d`
