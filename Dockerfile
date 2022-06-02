FROM node:16

RUN mkdir -p usr/src/dashboard-client
WORKDIR /usr/dashboard-client

COPY package*.json ./
RUN yarn install --immutable --immutable-cache --check-cache

COPY . .

RUN yarn build

EXPOSE 8080

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

CMD ["yarn","start"]

