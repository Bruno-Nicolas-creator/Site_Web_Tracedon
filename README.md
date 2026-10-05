# TraceDon — site vitrine

Site de présentation de TraceDon, nom commercial du logiciel Dons Invendus (l'application elle-même est un projet séparé, publié sur https://dons-invendus.vercel.app).

Site statique construit avec Vite et React, sans serveur ni base de données. Il n'a besoin d'aucune clé ni variable d'environnement.

## Lancer en local

Prérequis : Node.js.

1. `npm install`
2. `npm run dev` puis ouvrir http://localhost:3100 (le port 3000 est réservé à l'application TraceDon).

## Publier

Le site est publié par Vercel à partir de la branche `master` de ce dépôt : réglages par défaut détectés automatiquement (commande `npm run build`, dossier `dist`). Chaque envoi sur `master` met le site en ligne.

## Réglages à connaître

- **Bouton « Se connecter »** : masqué tant que l'application est fermée au public. Le réafficher en passant `APPLICATION_OUVERTE` à `true` dans `src/components/Navbar.tsx`.
- **Mentions légales** : `src/components/LegalModal.tsx`. Les champs `[À COMPLÉTER]` doivent être remplis avant toute ouverture au public.
- **Identité visuelle** : couleurs et polices communes avec l'application, définies dans `src/index.css`.

## Captures d'écran de l'application

Les images de l'accroche (`public/captures/`) sont de vraies captures de l'application TraceDon. Pour les refaire après une évolution de l'application :

1. Lancer l'application TraceDon en local (http://localhost:3000).
2. Lancer `npm run captures` dans ce dossier.
3. Relire chaque image avant de publier : aucun nom d'entreprise ou de personne réelle ne doit apparaître.

Le script (`scripts/captures-application.mjs`) se connecte avec les comptes de démonstration et ne fait que naviguer. La base locale étant celle de la production, il ne doit jamais cliquer sur un bouton qui modifie des données.
