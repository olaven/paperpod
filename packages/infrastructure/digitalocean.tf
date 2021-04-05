variable "do_token" {
  type        = string
  description = "token for Digitalocean"
  sensitive   = true
}
/* variable "pvt_key" {
  type        = string
  description = "Private key for Digitalocean, getting SSH to work"
  sensitive   = true
} */

# Making SSH available for the rest of the script 
/* data "digitalocean_ssh_key" "terraform" {
  name = "terraform"
} */

# See https://www.digitalocean.com/community/tutorials/how-to-use-terraform-with-digitalocean for more details on ssh in the future

resource "digitalocean_droplet" "paperpod-manager-droplet" {
  name   = "paperpod-manager"
  image  = "docker-20-04"
  size   = "s-1vcpu-1gb"
  region = "ams1"
}
