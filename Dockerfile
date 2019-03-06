FROM node:latest

WORKDIR /usr/src/ts-exprss

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000