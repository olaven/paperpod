variable "github_api_token" {
  type        = string
  description = "Github API Token with proper access."
  sensitive   = true
}

provider "github" {
  token = var.github_api_token
}

resource "github_repository" "paperpod" {
  name         = "paperpod"
  description  = "Listen to the web"
  private      = false
  homepage_url = "https://paperpod.fm"

  pages {
    source {
      branch = "master"
      path   = "/docs"
    }
  }
}
