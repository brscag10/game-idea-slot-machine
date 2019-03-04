FROM mhart/alpine-node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN apt-get gzip

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "serve" ]