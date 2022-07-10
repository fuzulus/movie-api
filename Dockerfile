FROM node:14.15-alpine as development

WORKDIR /app

COPY ./package*.json ./

RUN npm install rimraf

RUN npm install -g @nestjs/cli

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "start:dev"]

FROM node:14.15-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

CMD ["node", "dist/main"]