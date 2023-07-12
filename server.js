const http = require("http");
const app = require("./app");

/*const server = http.createServer((req, res) => {
  res.end("Hellow Javascripto");
});*/
/*app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);*/

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

/*CHAPITRE 1
on initialise toujours node avec NPM INIT pour créer le package, 
ensuite on créer le fichier .gitignore pour dire à git de 
pas init le fichier node_modules.

Ici, on importe le package HTTP natif de Node 
et on l'utilise pour créer un serveur, 
en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur. 
Cette fonction reçoit les objets request et response en tant qu'arguments. 
Dans cet exemple, vous utilisez la méthode end de la réponse 
pour renvoyer une réponse de type string à l'appelant.

Dans la dernière ligne, vous configurez le serveur pour qu'il écoute :
soit la variable d'environnement du port grâce à process.env.PORT : 
si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.

et pour lancer le server, on ecrit "node server", et pour l'erase "node server controlC"

J'utilise postman pour tester les routes localhost3000 et 4200

Par soucis de simpliciter, et pour eviter d'avoir à tuer/redémarrer le serveur,
j'ai installé nodemon à l'aide cette commande sudo npm install -g nodemon
ce qui fait que maintenant pour faire tourner le serveur 
j'utilise la commande nodemon server.

Chapitre 2

on enleve la logique server de base avec res, req 
on importe l'application avec require ("./app")
la fonction va recevoir la requete et la reponse comme avec la logique de base,
req et res qu'on definit dans notre fichier app 

Ensuite on dit à l'application sur quel port
elle doit tourner avec la même logique que server.listen

Chapitre 3 

Avant d'aller plus loin dans le cours, apportons quelques améliorations à notre fichier server.js, 
pour le rendre plus stable et approprié pour le déploiement :
la fonction normalizePort renvoie un port valide, 
qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. 
Elle est ensuite enregistrée dans le serveur ;
un écouteur d'évènements est également enregistré, 
consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
*/
