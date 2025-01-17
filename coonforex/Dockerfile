FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js .

EXPOSE 9100

CMD [ "node", "index.js" ]
