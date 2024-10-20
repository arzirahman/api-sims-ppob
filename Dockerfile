FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run db:generate

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
