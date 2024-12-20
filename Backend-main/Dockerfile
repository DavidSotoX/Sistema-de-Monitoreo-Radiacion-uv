FROM node:20.9.0

RUN npm i -g nodemon
RUN mkdir -p /semaforo_pis/backend_pis

WORKDIR /semaforo_pis/backend_pis

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD [ "npm","run","start" ]