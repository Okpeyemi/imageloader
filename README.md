# ImageLoader Project

Le projet **ImageLoader** contient deux dossiers principaux : `backend` et `frontend`.

## Prérequis

Avant de démarrer le projet, vous devez installer et configurer un utilisateur PostgreSQL.

## Démarrage du backend

1. Allez dans le dossier `backend`.
2. Créez un fichier `.env` contenant les informations suivantes :
    ```plaintext
    DB_USER=votreusername
    DB_PASSWORD=votrepassword
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=votredb
    JWT_SECRET=votresupersecret
    ```
3. Exécutez la commande suivante pour installer les dépendances :
    ```bash
    npm install
    ```
4. Démarrez le serveur backend avec :
    ```bash
    npm run server
    ```

## Démarrage du frontend

1. Allez dans le dossier `frontend`.
2. Exécutez la commande suivante pour installer les dépendances :
    ```bash
    npm install
    ```
3. Démarrez le serveur frontend avec :
    ```bash
    npm run dev
    ```

## Création d'un utilisateur

- Pour créer un **admin**, accédez au lien suivant : [http://localhost:3000/auth/register_admin](http://localhost:3000/auth/register_admin).
- Pour créer un **utilisateur**, accédez à [http://localhost:3000/](http://localhost:3000/). La redirection se fera automatiquement.

---

Assurez-vous que PostgreSQL est correctement configuré avant de démarrer le projet.
