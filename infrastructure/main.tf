terraform {


  backend "s3" {
    bucket = "paperpod-terraform-state"
    key    = "state/terraform.tfstate"
    region = "eu-north-1"
  }

  /*
  For the sake of this section, the term "environment account" refers to one of the accounts whose contents are managed by Terraform, separate from the administrative account described above.

Your environment accounts will eventually contain your own product-specific infrastructure. Along with this it must contain one or more IAM roles that grant sufficient access for Terraform to perform the desired management tasks.

IE-> Maa lese om IAM-roller 
  */

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}
