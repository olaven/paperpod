**This project is currently inactive. If you're interested regardless, please reach out :).** 

# Paperpod

## Sponsors

Please consider [sponsoring](https://github.com/sponsors/olaven/) this project.
This will allow me to give you perks in return for your kindness!

## Assets

- [Design Workspace in Figma](https://www.figma.com/file/VSrR5BIGv7BkliMdcwvA8q/Paperpod?node-id=0%3A1)
- [Any drawings from here](https://undraw.co/illustrations)
- [Or icons from here](https://feathericons.com/)

## Developer's getting started 

### Setup

In addition to cloning the source code, you'll
most likely want access to an 
* [AWS account](https://aws.amazon.com/). This account must have
  * an [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html) called "paperpod" and have
  * access to [AWS Polly](https://aws.amazon.com/polly/). 
* a [Stripe account](https://stripe.com/en-no) with the resources outlined in [stripe.tf](./packages/infrastructure/stripe.tf). 

Afterwards, create a `.env` file containing: 
```
ADMIN_USERNAME=<SOME_ADMIN_USERNAME>
ADMIN_PASSWORD=<SOME_ADMIN_PASSWORD>
GATEWAY_PORT=8080
API_PORT=8081
AUTHENTICATION_PORT=8082
AUTHENTICATION_INTERNAL_PORT=8083
WEB_PORT=8084
DOCS_PORT=8085
METABASE_PORT=8086
JWT_SECRET=<SOME_SECRET_STRING>
PGDATABASE=paperpod
PGPORT=5432
PGUSER=<SOME_USERNAME>
PGPASSWORD=<SOME_PASSWORD>
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
STRIPE_PUBLISHABLE_KEY=<STRIPE_PUBLISHABLE_KEY>
STRIPE_API_KEY=<STRIPE_API_KEY> # must have permissions to deal with payments and products
ULTRAHOOK_API_KEY=<ULTRAHOOK_API_KEY>
LOG_LEVEL=trace
```

### Working with the code 
This project relies heavily on [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [Docker Compose](https://docs.docker.com/compose/). A basic understanding of how those work is recommended. 

* All commands are run from the root of the project 
* To run a yarn command (i.e. `add` a dependency) to a package, simply run `yarn <PACKAGE> <COMMAND> <ARGUMENTS>`, e.g. `yarn mobile add lodash`. 
* To boot and develop the web services, run `docker compose up`
* To view logs from any service, use `docker compose logs -f <SERVICE_NAME>`, e.g. `docker compose logs -f authentication`. 
* To stop everything, run `docker compose down` 


### Finding documentation 
The documentation is still a bit lacking, but most if it is available in this and other `README.md` files in this repository. Furthermore, API docs are available at [paperpod.fm/docs](https://paperpod.fm/docs/). 

### Recommendations

The project structure is built with [docker compose](https://docs.docker.com/compose/) in mind.
Docker Compose is great, but the commands can get long and tedious.
My recommendation is to add these aliases to your environment, for an easier time:

```bash
alias du="docker compose up -d";
alias dp="docker compose ps";
alias dr="docker compose restart";
alias dd="docker compose down";
alias db="docker compose build";
alias de="docker compose exec";
alias dl="docker compose logs -f";
```
