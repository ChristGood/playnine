# playnine

Pour installer les dépendance, faire :
npm install

Pour démarrer le jeu :
npm run start

But de jeu :
Le but du jeu est de choisir un ou plusieurs nombres, pour que leur somme corresponde au nombre d'étoile affiché.

Comment jouer ?
- Cliquer sur les nombres pour les sélectionner. Vous pouvez recliquer dessus (dans la partie droite) pour les déselectionner.
- Une fois votre choix effectué, cliquer sur le bouton égal. Deux scénarios s'imposent :
    - Si la somme des nombres est équivalente au nombre d'étoile, le bouton égal devient vert. Vous pouvez recliquer dessus pour valider, ou sélectionner d'autres nombres.
    - Si c'est pas équivalent, le bouton égal devient rouge. Vous devez sélectionner une autre combinaison de nombre.
- Si vous êtes bloqué, vous pouver cliquer sur le bouton orange pour regénérer aléatoirement des étoiles. Vous ne pouvez le faire que 5 fois.

Fin du jeu :
- Si vous avez réussi à utiliser tous les nombres, vous gagnez
- Si vous êtes bloqué et que vous n'avez plus de chance pour rafraichir les étoiles, vous perdez
