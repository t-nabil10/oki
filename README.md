# Bulletin Primaire — application installable (PWA)

Contenu : `index.html` (l'application), `manifest.webmanifest`, `sw.js` (mode hors ligne), `favicon.svg`, `icons/`.

## Mettre en ligne en HTTPS (GitHub Pages, gratuit)
1. Créez un dépôt GitHub (ex. `bulletins`) et déposez **tout le contenu de ce dossier** à la racine (index.html à la racine).
2. Settings → Pages → *Deploy from a branch* → branche `main`, dossier `/ (root)` → Save.
3. Après ~1 minute l'adresse est : `https://VOTRE-PSEUDO.github.io/bulletins/` (HTTPS automatique).
   (Netlify Drop, Cloudflare Pages ou Vercel marchent aussi : glissez le dossier.)

## Installer
- **Android (Chrome)** : ouvrez l'adresse → bouton « ⬇️ Installer l'app » (ou menu ⋮ → *Installer l'application*).
- **iPhone / iPad (Safari uniquement)** : bouton Partager → *Sur l'écran d'accueil*.
- **PC (Chrome / Edge)** : icône d'installation dans la barre d'adresse (ou bouton « ⬇️ Installer l'app »).

## Mise à jour
Remplacez les fichiers sur GitHub et changez `VERSION` dans `sw.js` (ex. `bulletins-v2`).

## Bon à savoir
- 1re ouverture : internet requis (polices et bibliothèques PDF/Excel), ensuite l'app marche hors ligne.
- Les données (config, logo…) restent dans le navigateur de chaque appareil : utilisez *Exporter JSON* / GitHub pour les synchroniser.
- iPhone : le PDF s'ouvre dans la feuille de partage (Enregistrer dans Fichiers).
- Ne mettez **jamais** les noms des élèves dans un dépôt public.

## Si l'ancienne icône reste (vide / transparente)
Le navigateur garde l'icône au moment de l'installation : **désinstallez** l'app (PC : `chrome://apps` → clic droit → Supprimer ; Android : appui long → Désinstaller ; iPhone : supprimer l'icône), faites **Ctrl+F5** sur le site, puis réinstallez. Pensez aussi à changer `VERSION` dans `sw.js` à chaque mise à jour.

## Nouveautés
- **ZIP des PDF** : un dossier par classe (`6A/Bulletin_Nom.pdf`).
- **Synchro Google Sheets** : collez le lien « Publier sur le web » (Document entier → .xlsx) puis « Actualiser les notes ».
- **Contrôle des notes** avant génération (notes manquantes, hors barème /10, valeurs non numériques, doublons).
- **Année scolaire automatique** : `2026/2027` (change chaque année en août ; modifiable à la main).
