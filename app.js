const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "credential mongo mais notre ami git guardian m'avertit de ne pas le poster sur mon hub",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const path = require("path");

app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

/*
Chapitre 1 

Ici j'ai dabord init express avec ca npm install express --save
ensuite ca m'a crée un node_modules + un package
ensuite j'ai créer const express pour importer express

const app va contenir notre appli et enfin on l'exporte pour pouvoir y accéder
depuis les autres fichiers.

Chapitre 2

Vu qu'on a enlevé la reponse du server dans le fichier server,
on l'a réecrit dans l'app pcq c'est elle qui fait tourner express
donc avec app.use, on écrit la reponse que l'on veut voir s'afficher
cad le message, au format JSON.

Le serveur NODE retourne bien l'application Express yiha

Chapitre 3 

Middleware fonction qui recoit la requete et reponse, 
qui execute et qui passe au suivanté grace à ca NEXT();

Bien ecrire les middleware dans l'ordre, et ne pas oublier 
d'integrer Next au fonction et aux arguments

Pour l'instant on se familiarise avec le concept 
de middleware.

Chapitre 4 

on commence à ecrire les routes vers les api, 
donc on efface les middlewares qui nous servait d'exemple et on 
remplace par l'api stuff avec deux objets.
ensuite on vérifie via Postman ce que l'api nous renvoie.
dans l'api on a toujours, req res et next, mais on a egalement un argument, 
en l'url de l'api

chapitre 5

Integration du middleware CORS
on ajoute set header pour dire que tout le monde a accès 
à l'app, qu'on authorise tt le monde a posté et utilisé certaine method 
pour poster, lire ou supprimé.

chapitre 6

on post les premiers objet, pour se faire on va remplacer le app use
par app get, et creer un app post pour forcement poster, etant donné 
qu'on a pas créer de database encore on met juste un console log + un status
pour verifier que ca fonctionne.
il fallait aussi créer un appuse express JSON pour intercepté toutes les
requetes avec un content type json et mette a dispo le contenu dans l'objet 
de la requete

Chapitre 7

On a connecté l'appli a mongo db, on s'est crée un compte mongo, ensuite intégré
la formule avec mon username et mot de passe, sans oublier require mongoose.

chapitre 8

import du fichier thing
Modifi de userpost, avec notre instance thing, il faut dabord delete l'id, vu que 
mongo en genere un automatiquement.
L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , 
nous renverrons une réponse de réussite avec un code 201 de réussite. 
Dans notre bloc catch() , 
nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.

chapitre 9 

on modifie la route get en utilisant find pour forcement find les objets mis en vente.
nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau 
contenant tous les Things dans notre base de données. À présent, si vous ajoutez un Thing , 
il doit s'afficher immédiatement sur votre page d'articles en vente.

chapitre 10

on crée une route pour recup un seul objet. 
toujours avec app get.
nous utilisons deux-points : 
en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
nous utilisons ensuite la méthode findOne() dans notre modèle Thing 
pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
si aucun Thing n'est trouvé ou si une erreur se produit, 
nous envoyons une erreur 404 au front-end, avec l'erreur générée.

chapitre 11

pour modifier un de nos objet on introduit du coup, la même formule avec catch et error
sur app.post, nous exploitons la méthode updateOne() dans notre modèle Thing . 
Cela nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument.
Nous utilisons aussi le paramètre id passé dans la demande, 
et le remplaçons par le Thing passé comme second argument.

chapitre 12 

même principe, on récrit la même formule cette fois sans l'argument ...params:id, car c'est une suppression,
La méthode deleteOne() de notre modèle fonctionne comme findOne() et 
updateOne() dans le sens où nous lui passons un objet correspondant au document à supprimer. 
Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.

Chapitre 13

app.use('/images', express.static(path.join(__dirname, 'images')));
Cela indique à Express qu'il faut gérer la ressource images de manière statique 
(un sous-répertoire de notre répertoire de base, __dirname) 
à chaque fois qu'elle reçoit une requête vers la route /images. 
Enregistrez et actualisez l'application dans le navigateur. 
eDésormais, tout devrait fonctionner correctement.
*/
