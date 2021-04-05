variable "do_token" {
  type        = string
  description = "token for Digitalocean"
  sensitive   = true
}

provider "digitalocean" {
  token = var.do_token
}

variable "pvt_key" {
  type        = string
  description = "Private key for Digitalocean, getting SSH to work"
  sensitive   = true
}


# Create a new SSH key
resource "digitalocean_ssh_key" "default" {
  name       = "Terraform SSH Key"
  public_key = file("~/.ssh/id_rsa.pub")
}

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
  ]
}
resource "digitalocean_droplet" "manager-droplet" {
  name     = "paperpod-manager"
  image    = "docker-20-04"
  size     = "s-1vcpu-1gb"
  region   = "ams3"
  ssh_keys = [digitalocean_ssh_key.default.fingerprint]

  connection {
    host        = self.ipv4_address
    user        = "root"
    type        = "ssh"
    private_key = file("~/.ssh/id_rsa")
    timeout     = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      # TODO: use this to install nececarry dependencies etc. 
      "export PATH=$PATH:/usr/bin",
      "sudo apt-get update",
      "echo test in digitalocean droplet",
      "touch ~/some-file-from-terraform"
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


