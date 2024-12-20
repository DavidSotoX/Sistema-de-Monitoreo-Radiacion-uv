FROM node:20.9.0

RUN mkdir -p /semaforo_pis/frontend_pis
WORKDIR /semaforo_pis/frontend_pis

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
