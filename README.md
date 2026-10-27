# ⚽ Tachkila — Gestion d'équipe Atlas FC

**Application web interactive de gestion d'effectif et de composition d'équipe de football.**

Tachkila est une application web responsive conçue pour aider les entraîneurs de clubs amateurs à gérer leur effectif et à composer leur équipe selon la formation tactique classique en 4-4-2.

L'application permet d'ajouter, de modifier et de supprimer des joueurs, de les affecter à des positions compatibles avec leur poste et de conserver la composition de l'équipe grâce au stockage local du navigateur.

## 🌐 Démonstration

- **Site web :** [tachkila-pi.vercel.app](https://tachkila-pi.vercel.app)
- **Dépôt GitHub :** [Consulter le code source](https://github.com/Anassaouji/TACHKILA_.git)
- **Planification des tâches (Jira) :** [Tableau Jira - Atlas FC](https://aoujianass.atlassian.net/jira/software/projects/TE/boards/2)
- **Présentation Canva :** [Lien de Présentation Canva](https://canva.link/howhr5bvpqzw529)

## 📸 Présentation du projet

L'interface est organisée autour de trois zones principales :

- **En-tête :** présentation de l'application, légende des couleurs et formation tactique 4-4-2.
- **Panneau latéral :** liste des joueurs et outils de gestion de l'effectif.
- **Terrain de football :** représentation interactive des 11 positions de l'équipe.

Des fenêtres modales facilitent l'ajout et la modification des joueurs. L'interface fournit également des notifications et des compteurs actualisés automatiquement.

## ✨ Fonctionnalités

### 👥 Gestion des joueurs

- Ajouter un joueur avec son nom, son poste et son numéro.
- Modifier les informations d'un joueur grâce à un formulaire prérempli.
- Supprimer un joueur après confirmation.
- Afficher dynamiquement les joueurs dans la liste de l'effectif.
- Empêcher l'utilisation de numéros de maillot en double.

### ⚽ Gestion de la composition

- Afficher une formation tactique en 4-4-2.
- Affecter un joueur à une position compatible avec son poste.
- Empêcher plusieurs joueurs d'occuper la même position.
- Remettre un joueur sur le banc pour libérer sa position.
- Mettre à jour automatiquement le terrain et les cartes des joueurs.
- Distinguer visuellement les positions libres et occupées.

### 🎨 Code couleur des postes

| Poste | Signification | Couleur |
|---|---|---|
| GB | Gardien de but | Jaune |
| DEF | Défenseur | Bleu |
| MIL | Milieu de terrain | Vert |
| ATT | Attaquant | Rouge |

### ✅ Validation des formulaires

- Vérifier le nom du joueur à l'aide d'expressions régulières.
- Vérifier que les champs obligatoires sont renseignés.
- Accepter uniquement les numéros compris entre 1 et 99.
- Empêcher les doublons de numéros.
- Afficher les erreurs sous les champs concernés.
- Valider les saisies en temps réel.

### 💾 Sauvegarde des données

- Enregistrer l'effectif et la composition dans `localStorage`.
- Restaurer les données après l'actualisation de la page.
- Synchroniser les données des joueurs, la liste de l'effectif et le terrain.

### 📱 Interface responsive

L'application s'adapte aux différentes tailles d'écran :

- **Grand écran :** à partir de 1280 px.
- **Petit écran :** de 1024 à 1279 px.
- **Tablette :** de 768 à 1023 px.
- **Mobile :** jusqu'à 767 px.

### 🔔 Notifications et interactions

- Afficher des messages de succès ou d'erreur.
- Faire disparaître automatiquement les notifications après 3 secondes.
- Demander une confirmation avant la suppression d'un joueur.
- Fermer les fenêtres modales avec le bouton de fermeture, le bouton Annuler, la touche Échap ou un clic sur le fond.

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de la page et balises sémantiques |
| CSS3 | Mise en forme et règles responsive |
| JavaScript ES6+ | Logique de l'application et manipulation du DOM |
| Tailwind CSS | Stylisation de l'interface |
| CSS Grid | Construction du terrain de football |
| localStorage | Persistance des données dans le navigateur |
| Git | Gestion des versions du code |
| GitHub | Hébergement du dépôt et suivi du projet |
| Vercel | Déploiement de l'application web |

## 🧠 Concepts techniques mis en pratique

Ce projet m'a permis de mettre en pratique plusieurs notions fondamentales du développement front-end :

- **Manipulation du DOM :** sélection, parcours, création, modification et suppression d'éléments.
- **Création dynamique :** utilisation de `createElement()`, `appendChild()`, `textContent` et `classList`.
- **Délégation d'événements :** centralisation de la gestion des interactions avec les cartes des joueurs.
- **Propagation des événements :** utilisation de `stopPropagation()` pour maîtriser les interactions entre les modales et leurs contenus.
- **Gestion des formulaires :** utilisation de `submit`, `preventDefault()` et de l'événement `input`.
- **Expressions régulières :** validation des données saisies par l'utilisateur.
- **Tableaux d'objets :** organisation des joueurs avec les propriétés `id`, `nom`, `numero`, `poste` et `position`.
- **CSS Grid :** création d'un terrain à partir d'une grille de 12 colonnes et 9 lignes.
- **Persistance des données :** utilisation de `JSON.stringify()`, `JSON.parse()` et `localStorage`.
- **Responsive design :** adaptation de l'interface aux écrans d'ordinateur, aux tablettes et aux mobiles.


## 🧪 Tests et validation

Les scénarios suivants permettent de vérifier le bon fonctionnement de l'application :

- Ajouter un joueur avec des informations valides.
- Refuser un nom invalide, un champ obligatoire vide ou un numéro déjà utilisé.
- Affecter un joueur à une position compatible et disponible.
- Empêcher l'affectation à un poste incompatible ou à une position occupée.
- Remettre un joueur sur le banc et libérer sa position.
- Modifier les informations d'un joueur et gérer correctement un changement de poste.
- Supprimer un joueur et libérer sa position.
- Vérifier la restauration des données après actualisation.
- Tester les interactions avec les modales et les notifications.
- Vérifier le fonctionnement sur ordinateur, tablette et mobile.


## 🎯 Objectifs pédagogiques

Ce projet a pour objectif de renforcer mes compétences en développement front-end, notamment :

- La programmation JavaScript et la logique applicative.
- La manipulation du DOM et la gestion des événements.
- La validation des formulaires avec des expressions régulières.
- La conception d'interfaces responsives.
- L'utilisation de CSS Grid et de Tailwind CSS.
- La sauvegarde des données avec `localStorage`.
- La gestion de versions avec Git et GitHub.
- Le déploiement d'une application web avec Vercel.

## 👨‍💻 Auteur

**Anass Aouji**
