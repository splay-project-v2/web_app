# DEV DOCKER FILE - ADD VOLUME WITH DOCKER COMPOSE 
FROM node:11.6.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD npm run serve