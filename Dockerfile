FROM node

WORKDIR /server

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["node", "server"]


