FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY .development.env .development.env

RUN yarn --frozen-lockfile

COPY apps/auth apps/auth
COPY libs libs

RUN cd apps/auth && yarn

RUN yarn build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .production.env .production.env

RUN yarn --production --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]
