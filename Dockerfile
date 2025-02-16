FROM node:20-alpine

WORKDIR /app

COPY package.json /worker/
COPY . /app/

CMD ["sh", "-c", "npm install && npm run dev"]
