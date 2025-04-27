FROM node:lts

COPY ./frontend/ /tmp/vitepress/
WORKDIR /tmp/vitepress

RUN npm install