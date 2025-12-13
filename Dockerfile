FROM node:20

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "80"]