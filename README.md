# Projet d'exemple Erable Nodejs

Simple projet nodejs avec un seul module (code dans le répertoire modulers).

Utilise une base MySQL (schéma à créé dans le répertoire database).

## Variables d'environnement nécessaire :

A adapter selon l'environnement

```
ERABLE_CONFIG_DIR=/workspace/nodejstest/modulers/test/resources/config/
ERABLE_SERVICE=njstest
ERABLE_PORTS=8080
MYSQL_WRITE_DATABASE="mysql://njstest:njstest@localhost:3306/njstest"
```

## Pour lancer les TU et builder l'epm :
```
cd modulers && npm install --ignore-scripts && npm run build && npm pack
cd ..
npm install --ignore-scripts && npm run build
```
l'epm est généré dans le repertoire dist

## Pour lancer le module
```
cd modulers
node service.js
```

