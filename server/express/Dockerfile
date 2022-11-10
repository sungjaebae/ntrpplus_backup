FROM node:16-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /app

# nc(netcat) 커맨드 설치
RUN apk add netcat-openbsd

RUN chown --changes --silent --no-dereference --recursive \
    1000:1000 /app

USER node

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start"]