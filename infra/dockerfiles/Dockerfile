ARG NODE_VERSION=22.21

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
  && yarn install --frozen-lockfile \
  && yarn cache clean

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/

COPY --from=BASE /usr/src/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
  && yarn build

FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/

RUN yarn add next-runtime-env@1.7.4 --no-optional --prefer-offline --no-audit

COPY --from=BUILD /usr/src/next.config.mjs ./
COPY --from=BUILD /usr/src/next-i18next.config.mjs ./
COPY --from=BUILD /usr/src/.next/standalone ./
COPY --from=BUILD /usr/src/server.prod.js ./
COPY --from=BUILD /usr/src/.next/static ./.next/static
COPY --from=BUILD /usr/src/public ./public

CMD ["node", "server.prod.js"]
