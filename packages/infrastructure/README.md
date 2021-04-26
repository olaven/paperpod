# Infrastructure

The infrastructure is set up with [terraform](https://www.terraform.io/).

## Expected environment variables

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `TF_VAR_stripe_api_token`
- `TF_VAR_test_user_coupon_code`

## When does it run?

TODO: update when actually implemented

- validates/plans on every push
- actually applies if merged to `main`

## What does it confgure?

- [Backend](https://www.terraform.io/docs/language/settings/backends/index.html) in [Amazon S3](https://aws.amazon.com/s3/)
- TODO: Stripe
- TODO: Digitalocean
