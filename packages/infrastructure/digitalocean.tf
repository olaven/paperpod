variable "do_token" {
  type        = string
  description = "token for Digitalocean"
  sensitive   = true
}

#FIXME: Remove this? 
variable "droplet_username" {
  type = string 
  description = "the username of Digitalocean droplet"
  sensitive = true 
}

#FIXME: Remove this? 
variable "droplet_password" {
  type = string 
  description = "the password of Digitalocean droplet"
  sensitive = true
}

provider "digitalocean" {
  token = var.do_token
}


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

resource "digitalocean_record" "www" {
  domain = digitalocean_domain.default.name
  type = "A"
  name = "www"
  value = digitalocean_droplet.manager-droplet.ipv4_address
}

resource "digitalocean_vpc" "network" {
  name = "paperpod-network"
  description = "Private network for Paperpod services"
  region = "ams3"
}

resource "digitalocean_droplet" "manager-droplet" {
  
  name   = "paperpod-manager"
  image  = "docker-20-04"
  size   = "s-1vcpu-2gb"
  region = "ams3"
  private_networking = true
  vpc_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_database_cluster" "database-cluster" {
  name       = "database-cluster"
  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "ams3"
  node_count = 1
  private_network_uuid = digitalocean_vpc.network.id
}

resource "digitalocean_database_firewall" "db_firewall" {
  cluster_id = digitalocean_database_cluster.database-cluster.id 

  rule {
    type = "droplet"
    value = digitalocean_droplet.manager-droplet.id
  }
}

resource "digitalocean_database_user" "user" {
  cluster_id = digitalocean_database_cluster.database-cluster.id
  name = "paperpod_user"
}

resource "digitalocean_database_db" "database" {
  name       = "paperpod"
  cluster_id = digitalocean_database_cluster.database-cluster.id
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

output "database_host"  {
  sensitive = true
  value = digitalocean_database_cluster.database-cluster.private_host
}
output "database_database" {
  sensitive = true
  value = digitalocean_database_db.database.name
}
output "database_user" {
  sensitive = true
  value = digitalocean_database_user.user.name 
}
output "database_password" {
  sensitive = true
  value = digitalocean_database_user.user.password
}

output "database_port" {
  sensitive = true 
  value = digitalocean_database_cluster.database-cluster.port
}