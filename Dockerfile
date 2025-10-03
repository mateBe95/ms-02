FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:22-alpine AS prod
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/server ./server
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/server/controllers ./server/controllers
COPY --from=build /app/app ./app
COPY --from=build /app/public ./public
CMD ["node", "server.js"]