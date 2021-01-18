for i in 1 2 3; do 
docker-machine create \
 --driver digitalocean \
 --digitalocean-region ams3 \
 --digitalocean-access-token $DOTOKEN \
 --engine-install-url https://releases.rancher.com/install-docker/19.03.9.sh \
 paperpod-node-$i \
 ; done # bug in current version https://www.digitalocean.com/community/questions/unable-to-verify-the-docker-daemon-is-listening
