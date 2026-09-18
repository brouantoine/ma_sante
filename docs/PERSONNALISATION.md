# Guide de personnalisation

## Couleurs

Modifier uniquement :

`frontend/src/styles/variables.css`

Variables principales :

- `--primary` : bleu MA SANTÉ
- `--green` : vert santé
- `--text` : texte principal
- `--bg` : arrière-plan
- `--border` : bordures

## Menu

Modifier `frontend/src/layouts/AppLayout.jsx`.

Chaque entrée contient :

```js
{ label: "Patients", path: "/patients", icon: Users }
```

## Pages

Les pages React sont séparées dans :

`frontend/src/pages/`

## Composants

Les éléments réutilisables sont dans :

`frontend/src/components/`

## API

Toutes les requêtes passent par :

`frontend/src/services/api.js`

## Images

Déposer les images dans :

`frontend/public/images/`

## Utilisateurs

Les comptes de démonstration sont créés par :

```bash
python manage.py seed_default_users
```

Pour modifier les rôles ou ajouter des utilisateurs par défaut, éditer :

`backend/accounts/management/commands/seed_default_users.py`

## Base de données

Chaque domaine métier doit idéalement conserver son application Django séparée, conformément au cahier des charges.
