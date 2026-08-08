FROM node:20-alpine

WORKDIR /app

ARG APP_URL=http://localhost:3000
ENV APP_URL=$APP_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "serve"]
