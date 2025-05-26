# TypeScript Backend with MongoDB

Un backend basique créé avec TypeScript, Express.js et MongoDB.

## Prérequis

- Node.js
- MongoDB (local ou MongoDB Atlas)

## Installation

1. Installez les dépendances :

```bash
npm install
```

2. Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ts-backend
```

## Scripts disponibles

- `npm run dev` : Lance le serveur en mode développement avec hot-reload
- `npm run build` : Compile le TypeScript en JavaScript
- `npm start` : Lance le serveur en mode production
- `npm run watch` : Surveille les changements et recompile automatiquement

## Structure du projet

```
.
├── src/            # Code source TypeScript
│   ├── config/     # Configuration (MongoDB, etc.)
│   ├── models/     # Modèles Mongoose
│   └── index.ts    # Point d'entrée de l'application
├── dist/           # Code compilé JavaScript
├── package.json    # Dépendances et scripts
└── tsconfig.json   # Configuration TypeScript
```

## Routes disponibles

- `GET /` : Page d'accueil
- `POST /api/users` : Créer un nouvel utilisateur
- `GET /api/users` : Lister tous les utilisateurs

## Exemple d'utilisation

Créer un nouvel utilisateur :

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

Lister tous les utilisateurs :

```bash
curl http://localhost:3000/api/users
```
