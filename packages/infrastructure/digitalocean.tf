variable "do_token" {
  type        = string
  description = "token for Digitalocean"
  sensitive   = true
}

variable "gateway_port" {
  type = number 
  description = "the port for gateway"
  sensitive = true
}
variable "web_port" {
  type = number 
  description = "the port for web"
  sensitive = true
}
variable "docs_port" {
  type = number 
  description = "the port for docs"
  sensitive = true
}
variable "api_port" {
  type = number 
  description = "the port for api"
  sensitive = true
}
variable "authentication_port" {
  type = number 
  description = "the port for authentication"
  sensitive = true
}
variable "log_level" {
  type = string 
  description = "the port for log"
  sensitive = true
}

variable "stripe_api_key" {
  type = string 
  description = "the private stripe API key"
}

variable "stripe_publishable_key" {
  type = string 
  description = "the PUBLIC stripe API key"
}

## API 
variable "authentication_internal_port" {
  type = number 
  description = "the port for authentication_internal"
  sensitive = true
}

variable "admin_username" {
  type = string
  description = "admin username"
  sensitive = true
}

variable "admin_password" {
  type = string
  description = "admin password"
  sensitive = true
}

variable "jwt_secret" {
  type = string
  description = "secret for encrypting JWT's"
  sensitive = true
}

variable "aws_access_key_id" {
  type = string
  description = "AWS Access Key ID"
  sensitive = true
}

variable "aws_secret_access_key" {
  type = string
  description = "AWS Secret Access Key"
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
    digitalocean_app.paperpod-app.urn, digitalocean_domain.default.urn,  digitalocean_database_cluster.database-cluster.urn,
  ]
}

resource "digitalocean_domain" "default" {
  name       = "paperpod.fm"
}


resource "digitalocean_database_cluster" "database-cluster" {
  name       = "database-cluster"
  engine     = "pg"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "ams3"
  node_count = 1
}


data "digitalocean_database_ca" "ca" {
  cluster_id = digitalocean_database_cluster.database-cluster.id
}


resource "digitalocean_app" "paperpod-app" {
  spec {
    name    = "paperpod"
    region  = "ams"
    domain {
      name = "paperpod.fm"
      zone = digitalocean_domain.default.name
    }

    database {
      name       = "db"
      engine     = "PG"
      production = true
      cluster_name = digitalocean_database_cluster.database-cluster.name
    }
    
    alert {
      rule = "DEPLOYMENT_FAILED"
    }
    
    service {
      name               = "gateway"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      github {
        branch         = "main"
        deploy_on_push = true
        repo           = "olaven/paperpod"
      }

      dockerfile_path = "dockerfiles/Dockerfile.gateway"
      http_port = var.gateway_port

      routes { 
        path = "/"
      }

      env { 
        key = "PORT"
        value = var.gateway_port
      }

      env { 
        key = "WEB_PORT"
        value = var.web_port
      }

      env { 
        key = "DOCS_PORT"
        value = var.docs_port
      }
      
      env { 
        key = "API_PORT"
        value = var.api_port
      }
      
      env { 
        key = "AUTHENTICATION_PORT"
        value = var.authentication_port
      }
      
      env { 
        key = "NODE_ENV"
        value = "production"
      }
      
      env { 
        key = "LOG_LEVEL"
        value = var.log_level
      }

      alert {
        value    = 75
        operator = "GREATER_THAN"
        window   = "TEN_MINUTES"
        rule     = "CPU_UTILIZATION"
      }
    }
    service {
      name               = "web"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      github {
        branch         = "main"
        deploy_on_push = true
        repo           = "olaven/paperpod"
      }

      dockerfile_path = "dockerfiles/Dockerfile.web"
      internal_ports = [var.web_port]

      env {
        key = "LOG_LEVEL"
        value = var.log_level
      }

      env {
        key = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        value = var.stripe_publishable_key
      }
    }

    service {
      name               = "api"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      github {
        branch         = "main"
        deploy_on_push = true
        repo           = "olaven/paperpod"
      }

      dockerfile_path = "dockerfiles/Dockerfile.api"
      internal_ports = [var.api_port]

       env { 
        key = "PORT"
        value = var.api_port
      }

      env {
        key = "AUTHENTICATION_INTERNAL_PORT"
        value = var.authentication_internal_port
      }

      env {
        key = "ADMIN_USERNAME"
        value = var.admin_username
      }

      env {
        key = "ADMIN_PASSWORD"
        value = var.admin_password
      }

      env {
        key = "JWT_SECRET"
        value = var.jwt_secret
      }
      
      env {
        key = "AUTHENTICATION_PORT"
        value = var.authentication_port
      }
      
      env {
        key = "PGPORT"
        value = "$${db.PORT}"
      }
      env {
        key = "PGHOST"
        value = "$${db.HOSTNAME}"
      }

      env {
        key = "PGDATABASE"
        value = "$${db.DATABASE}"
      }

      env {
        key = "PGUSER"
        value = "$${db.USERNAME}"
      }

      env {
        key = "PGPASSWORD"
        value = "$${db.PASSWORD}"
      }

      env {
        key = "DATABASE_CA"
        value = "$${db.CA_CERT}"
      }

      env {
        key = "PAPERPOD_SCHEMA"
        value = "api"
      }


      env {
        key = "AWS_ACCESS_KEY_ID"
        value = var.aws_access_key_id
      }
      
      env {
        key = "AWS_SECRET_ACCESS_KEY"
        value = var.aws_secret_access_key
      }

      env {
        key = "LOG_LEVEL"
        value = var.log_level
      }
      
      env {
        key = "PGPORT"
        value = digitalocean_database_cluster.database-cluster.port
      }

      alert {
        value    = 75
        operator = "GREATER_THAN"
        window   = "TEN_MINUTES"
        rule     = "CPU_UTILIZATION"
      }
    }

    service {
      name               = "docs"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      github {
        branch         = "main"
        deploy_on_push = true
        repo           = "olaven/paperpod"
      }


      dockerfile_path = "dockerfiles/Dockerfile.docs"
      internal_ports = [var.docs_port]

      alert {
        value    = 75
        operator = "GREATER_THAN"
        window   = "TEN_MINUTES"
        rule     = "CPU_UTILIZATION"
      }
    }

     service {
      name               = "authentication"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      internal_ports = [var.authentication_port, var.authentication_internal_port]

      github {
        branch         = "main"
        deploy_on_push = true
        repo           = "olaven/paperpod"
      }

      dockerfile_path = "dockerfiles/Dockerfile.authentication"

    

      env { 
        key = "PORT"
        value = var.authentication_port
      }

      env {
        key = "INTERNAL_PORT"
        value = var.authentication_internal_port
      }


      env {
        key = "ADMIN_USERNAME"
        value = var.admin_username
      }

      env {
        key = "ADMIN_PASSWORD"
        value = var.admin_password
      }

      env {
        key = "JWT_SECRET"
        value = var.jwt_secret
      }
      
      env {
        key = "PAPERPOD_SCHEMA"
        value = "api"
        # FIXME make all secret
      }

      env {
        key = "PGPORT"
        value = "$${db.PORT}"
      }
      env {
        key = "PGHOST"
        value = "$${db.HOSTNAME}"
      }

      env {
        key = "PGDATABASE"
        value = "$${db.DATABASE}"
      }

      env {
        key = "PGUSER"
        value = "$${_self.USERNAME}"
      }

      env {
        key = "PGPASSWORD"
        value = "$${db.PASSWORD}"
      }

      env {
        key = "DATABASE_CA"
        value = "$${db.CA_CERT}"
      }

      env {
        key = "STRIPE_API_KEY"
        value = var.stripe_api_key
      }

      env { 
        key = "LOG_LEVEL"
        value = var.log_level
      }

      alert {
        value    = 75
        operator = "GREATER_THAN"
        window   = "TEN_MINUTES"
        rule     = "CPU_UTILIZATION"
      }
    }
  }
}