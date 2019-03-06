FROM node:latest

WORKDIR /usr/src/ts-express

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "server-run"]