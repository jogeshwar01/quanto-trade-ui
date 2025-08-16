## AWS

- Cloudfront
- S3
- Certificate Manager
- EC2

## Commands

sudo apt install nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 22.12.0
nvm use 22.12.0
node -v
git clone https://github.com/jogeshwar01/bullet-exchange-ui.git
cd bullet-exchange-ui/
rm -rf frontend/
cd backend/
npm i -g typescript
screen -R server
npm run dev

<exit screen>

## Reverse Proxy

sudo apt-get install nginx
sudo vi /etc/nginx/nginx.conf

```sh
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name vestserver.jogeshwar.xyz;

        location / {
            proxy_pass http://localhost:7000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

sudo systemctl restart nginx
sudo systemctl status nginx

---

### Certbot

https://certbot.eff.org/instructions?ws=nginx&os=snap

sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
