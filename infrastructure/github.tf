variable "github_api_token" {
  type        = string
  description = "Github API Token with proper access."
  sensitive   = true
}

provider "github" {
  token = var.github_api_token
}

#TODO: should import -> `terraform import github_repository.paperpod paperpod`
# This crashes, see: https://github.com/integrations/terraform-provider-github/issues/647
resource "github_repository" "paperpod" {
  name = "paperpod"
}
