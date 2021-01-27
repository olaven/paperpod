#from: https://www.digitalocean.com/community/tutorials/how-to-configure-the-linux-firewall-for-docker-swarm-on-ubuntu-16-04

ufw allow 22/tcp;
ufw allow 2376/tcp;
ufw allow 2377/tcp;
ufw allow 7946/tcp;
ufw allow 7946/udp;
ufw allow 4789/udp;

ufw enable;
ufw reload; 

systemctl restart docker; 





