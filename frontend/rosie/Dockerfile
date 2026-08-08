FROM node:20-alpine

WORKDIR /app

ARG NEXT_PUBLIC_DOCS_URL=http://localhost:3001
ENV NEXT_PUBLIC_DOCS_URL=$NEXT_PUBLIC_DOCS_URL

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Set environment and run
ENV NODE_ENV development
EXPOSE 3000

CMD ["npm", "start"]
