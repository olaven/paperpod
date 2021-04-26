variable "github_api_token" {
  type        = string
  description = "Github API Token with proper access."
  sensitive   = true
}

provider "github" {
  token = var.github_api_token
}

resource "github_repository" "terraform" {
  name = "paperpod"
  visibility = "public"
  description = "https://paperpod.fm"
  homepage_url  = "https://paperpod.fm" 
  has_downloads = true 
  has_issues = true 
  has_projects  = true 
  has_wiki = true 
  vulnerability_alerts  = true 
  pages { 
      cname      = "paperpod.fm" 
      source {
          branch = "main" 
          path   = "/docs" 
            }
        }
}
