variable "github_api_token" {
  type        = string
  description = "Github API Token with proper access."
  sensitive   = true
}

provider "github" {
  token = var.github_api_token
}

#NOTE: Github config is removed while waiting for https://github.com/integrations/terraform-provider-github/issues/647 
# Tracking in 
