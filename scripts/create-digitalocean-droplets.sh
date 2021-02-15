function create_machine() {

    docker-machine create \
        --driver digitalocean \
        --digitalocean-region ams3 \
        --digitalocean-access-token $DOTOKEN \
        --digitalocean-image ubuntu-18-04-x64 \
        --digitalocean-size s-2vcpu-2gb \
        --engine-install-url https://releases.rancher.com/install-docker/19.03.9.sh \
        $1; 
}

create_machine paperpod-manager; 
#create_machine paperpod-worker-1 # add as needed, may be ommited
#create_machine paperpod-worker-2 # add as needed, may be ommited