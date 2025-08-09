FROM node:21.1.0-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]