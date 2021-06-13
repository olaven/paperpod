# Adapted from: https://github.com/franckverrot/terraform-provider-stripe

variable "stripe_api_token" {
  type        = string
  description = "Stripe API Token with proper access."
  sensitive   = true
}

variable "test_user_coupon_code" {
  type        = string
  description = "Code for temporary free access. Intendend for test users etc."
  sensitive   = true
}

provider "stripe" {
  # NOTE: This is populated from the `TF_VAR_stripe_api_token` environment variable.
  api_token = var.stripe_api_token
}

resource "stripe_product" "product" {
  name = "Paperpod Full Access"
  type = "service"

  metadata = {
    # "collection" is a grouping defined by me, not stripe.
    collection: "paperpod"
  }
}

resource "stripe_plan" "product_plan" {
  product  = stripe_product.product.id
  amount   = 800 #resolves to 8$
  currency = "usd"
  interval = "month"

  metadata = {
    # "collection" is a grouping defined by me, not stripe.
    collection: "paperpod"
  }
}

/* resource "stripe_webhook_endpoint" "my_endpoint" { TODO: setup something like this 
  url = "https://mydomain.example.com/webhook"

  enabled_events = [
    "charge.succeeded",
    "charge.failed",
    "source.chargeable",
  ]
}
 */

resource "stripe_coupon" "test_user_coupon" {
  code               = var.test_user_coupon_code
  name               = "Test User Access"
  duration           = "repeating"
  duration_in_months = 1
  amount_off         = 8
  currency           = "usd" # lowercase

  #max_redemptions = 1024
  #redeem_by       = "2022-09-02T12:34:56-08:00" # RFC3339, in the future
  metadata = {
    # "collection" is a grouping defined by me, not stripe.
    collection: "paperpod"
  }
}
