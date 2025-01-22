# Projet PMT

Le frontend de l'application est développé avec Angular, offrant une interface utilisateur moderne et intuitive.

Caractéristiques principales :
Inscription et connexion sécurisées des utilisateurs.
Gestion des projets (création, modification, invitation de membres).
Gestion des tâches (ajout, mise à jour, assignation et visualisation).
Notifications en temps réel et suivi de l'historique des modifications.
Tableau de bord interactif pour visualiser les tâches et leur progression.
Technologies utilisées :
Angular : Framework principal pour le développement frontend.
Tests : Jest pour les tests unitaires du frontend.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Déploiement avec Docker

Voici les étapes pour déployer et exécuter l'application backend à l'aide de Docker.


### Prérequis
- [Docker](https://docs.docker.com/get-docker/) doit être installé sur votre machine.

### Étapes de déploiement

1. **Télécharger l'image Docker depuis Docker Hub** :
   ```bash
   docker pull oussamasj179/angular-pmt-frontend:latest
   ```
   ---
   
2. **Exécuter le conteneur** :
   ```bash
   docker run -p 8080:8080 oussamasj179/angular-pmt-frontend:latest
   ```
   ---

 3. **Lancer l'application** :
   ```lien
   http://localhost:4200
   ```
   ---





