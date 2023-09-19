FROM node:18.14.0-alpine as root

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./

RUN npm run build

FROM node:18.14.0-alpine

WORKDIR /app/frontend

COPY --from=root /app/frontend/public ./public
COPY --from=root /app/frontend/package.json ./package.json
COPY --from=root /app/frontend/next.config.js ./next.config.js
COPY --from=root /app/frontend/next-i18next.config.js ./next-i18next.config.js
COPY --from=root /app/frontend/.next ./.next
COPY --from=root /app/frontend/node_modules ./node_modules
