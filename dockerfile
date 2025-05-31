# Usamos una imagen base oficial de Node.js
FROM node:18

# Creamos un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos necesarios
COPY package*.json ./
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto en el que corre la app
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]