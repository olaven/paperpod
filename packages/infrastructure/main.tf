terraform {

  backend "s3" {
    bucket = "paperpod-terraform-state"
    key    = "state"
    region = "eu-north-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.14"
    }

    stripe = {
      source  = "franckverrot/stripe"
      version = "1.7.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 4.24.1"
    }

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.25.2"
    }
  }
}
