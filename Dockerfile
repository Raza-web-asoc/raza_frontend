# Usa la imagen de Node.js
FROM node:21 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY . .

RUN npm install --no-cache

EXPOSE 80

FROM build

CMD ["tail", "-f", "/dev/null"]
