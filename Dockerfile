# Usamos una versión ligera de Node.js
FROM node:22-slim

# Instalamos pnpm de forma global
RUN corepack enable && corepack prepare pnpm@latest --activate

 # Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalamos las dependencias dentro del contenedor
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm rebuild esbuild

# Copiamos el resto de tu código
COPY . .

# Exponemos el puerto que usa Express
EXPOSE 3000

# Comando para arrancar en modo desarrollo con tsx
CMD ["pnpm", "run", "dev"]