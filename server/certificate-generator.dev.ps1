$domain="ntrp.ml"
$SSL_Path="/etc/letsencrypt/live/$domain"

mkdir -p ./certbot/conf/live/$domain

docker-compose -f docker-compose.yml run --rm --entrypoint "`
    openssl req -x509 -nodes `
    -days 365 `
    -newkey rsa:2048 `
    -keyout '$SSL_Path/privkey.pem' `
    -out '$SSL_Path/fullchain.pem' `
    -subj '/CN=localhost'" certbot

docker-compose -f docker-compose.yml up --force-recreate -d nginx

docker-compose -f docker-compose.yml run --rm --entrypoint "`
  rm -rf /etc/letsencrypt/live/$domain && `
  rm -rf /etc/letsencrypt/archive/$domain && `
  rm -rf /etc/letsencrypt/renewal/$domain.conf" certbot

docker-compose -f docker-compose.yml  run --rm --entrypoint "`
    certbot certonly --webroot -w /var/www/certbot `
    --email hsm0156@gmail.com `
    -d $domain `
    -d www.$domain `
    --rsa-key-size 4096 `
    --agree-tos `
    --no-eff-email `
    --force-renewal" certbot

docker-compose -f docker-compose.yml exec nginx nginx -s reload

# renew
# docker-compose -f docker-compose.yml  run --rm --entrypoint "`
#     certbot renew" certbot