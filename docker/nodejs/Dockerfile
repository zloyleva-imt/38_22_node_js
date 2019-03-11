FROM node:10.15.3-alpine

WORKDIR /var/www/
COPY ./ /var/www/

RUN npm install --quiet

EXPOSE 3000

CMD tail -f /etc/hosts