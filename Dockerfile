FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine3.20 AS production

WORKDIR /app

COPY --from=build /app/dist /app/dist

COPY package.json .

COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5173

CMD ["npm", "run", "preview"]
