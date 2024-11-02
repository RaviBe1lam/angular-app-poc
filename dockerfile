# base image
FROM node:11.3.0

WORKDIR /Angular_App_Final/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
