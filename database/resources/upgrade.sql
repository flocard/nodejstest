DROP TABLE IF EXISTS hello;

#Création de la table hello
CREATE TABLE hello (
                id VARCHAR(12) NOT NULL,
                message VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
);

INSERT INTO hello values("idtest", "message de test")
