terraform {

  backend "s3" {
    bucket = "paperpod-terraform-state"
    key    = "state"
    region = "eu-north-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }

    stripe = {
      source  = "franckverrot/stripe"
      version = "1.7.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 4.4.0"
    }

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}
