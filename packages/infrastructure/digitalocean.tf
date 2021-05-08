variable "do_token" {
  type        = string
  description = "token for Digitalocean"
  sensitive   = true
}

variable "droplet_username" {
  type = string 
  description = "the username of Digitalocean droplet"
  sensitive = true 
}

variable "droplet_password" {
  type = string 
  description = "the password of Digitalocean droplet"
  sensitive = true
}

provider "digitalocean" {
  token = var.do_token
}


# Create a new SSH key
# resource "digitalocean_ssh_key" "default" {
#   name       = "Terraform SSH Key"
#   public_key = file("~/.ssh/id_rsa.pub")
# }  

# See https://www.digitalocean.com/community/tutorials/how-to-use-terraform-with-digitalocean for more details on ssh in the future

resource "digitalocean_project" "paperpod-project" {
  name        = "paperpod"
  purpose     = "running Paperpod"
  description = "containing resources relevant to Paperpod.fm"
}

resource "digitalocean_project_resources" "project-to-resource-mapping" {
  project = digitalocean_project.paperpod-project.id
  resources = [
    digitalocean_droplet.manager-droplet.urn,
    digitalocean_database_cluster.database-cluster.urn,
    digitalocean_domain.default.urn,
  ]
}

resource "digitalocean_database_firewall" "droplet-to-database-firewall" {
  cluster_id = digitalocean_database_cluster.database-cluster.id

  rule {
    type  = "droplet"
    value = digitalocean_droplet.manager-droplet.id
  }
}

resource "digitalocean_domain" "default" {
  name       = "application.paperpod.fm"
  ip_address = digitalocean_droplet.manager-droplet.ipv4_address
}

resource "digitalocean_droplet" "manager-droplet" {
  
  name   = "paperpod-manager"
  image  = "docker-20-04"
  size   = "s-1vcpu-1gb"
  region = "ams3"
  
  connection {
    host        = self.ipv4_address
    password    = var.droplet_password
    user        = var.droplet_username
    type        = "ssh"
    timeout     = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      # TODO: use this to install nececarry dependencies etc. 
      "export PATH=$PATH:/usr/bin",
      "sudo apt-get update",
      "echo test in digitalocean droplet",
      "touch ~/file-from-action-hello"
    ]
  }   
}

resource "digitalocean_database_cluster" "database-cluster" {
  name       = "database-cluster"
  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "ams3"
  node_count = 1
}
resource "digitalocean_database_db" "database" {
  name       = "paperpod"
  cluster_id = digitalocean_database_cluster.database-cluster.id
}

# see if you can access this outside, in github actions
output "database_uri" {
  sensitive = true
  value = digitalocean_database_cluster.database-cluster.private_uri
}

output "droplet_id" {
  sensitive  = true
  value = digitalocean_droplet.manager-droplet.id
}

output "droplet_uri" {
  sensitive  = true
  value = digitalocean_droplet.manager-droplet.ipv4_address
}

output "droplet_uri_private" {
  sensitive  = true
  value = digitalocean_droplet.manager-droplet.ipv4_address_private
}

# output "droplet_username" {
#   sensitive = true
#   value = digitalocean_droplet.manager-droplet.user
# } 

