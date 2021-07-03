FROM node:14.17.1-alpine as base
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build



FROM node:14.17.1-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules


EXPOSE 3000
CMD ["node", "./dist/index.js"]



