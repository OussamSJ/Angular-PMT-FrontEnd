# Étape 1 : Utiliser une image Node.js pour construire l'application
FROM node:16 AS build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet Angular dans le conteneur
COPY package*.json ./
COPY . .

# Installer les dépendances et construire l'application Angular
RUN npm install
RUN npm run build --prod

# Étape 2 : Utiliser une image Nginx pour servir l'application
FROM nginx:alpine AS production-stage

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build-stage /app/dist/exercice /usr/share/nginx/html

# Exposer le port 4200
EXPOSE 4200

# Remplacer la configuration par défaut de Nginx pour le port 4200
CMD ["nginx", "-g", "daemon off;"]

