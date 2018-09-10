# My Application

##Generateur de message
###Requete d'entrée
    Body : {
      "messageRules" : {
        "customerType" : "GP",
        "reachedThresholdPercent" : "80",
        "eventType" : "fairuse"
      },
      "dynamicDatas" : [{
        "msisdn" : ["33601020304","33601020304"],
        "datas" : {"maxData" : "2Go"}
      }]
    }

    1.) Reception de la requete de generation de message
        a. Verification de la requete
        b. Verification des parametres d'entrée et recuperation des données du body
        c. Verification de l'existance du service
        d. Recuperation de l'enveloppe correspondant et au MAP_Service
        c. Verification des parametres associés à l'enveloppe
        d. Formatage du message
          1. Traitement des données
          2. Verification du traitement des données
        e. Envoie de la requete vers notifier


{
  "restApiRoot": "/api",
  "host": "localhost",
  "port": 3000,
  "remoting": {
    "context": {
      "enableHttpContext": false
    },
    "rest": {
      "normalizeHttpPath": false,
      "xml": false
    },
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "cors": false,
    "errorHandler": {
      "disableStackTrace": false
    }
  },
  "legacyExplorer": false
}
