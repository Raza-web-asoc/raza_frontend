# Usa la imagen de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo el package.json y package-lock.json primero (para optimizar la cache)
COPY ./frontend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu app
COPY ./frontend .

# Expone el puerto para Vite
EXPOSE 80

# Comando predeterminado (esto será reemplazado por Docker Compose)
CMD ["npm", "run", "dev"]
