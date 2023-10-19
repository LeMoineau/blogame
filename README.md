# BloGame

Projet académique pour la matière Technologie Web 2 à l'INSA de Rouen.
Le site consiste en un jeu de création et de visite de "blog". Les "blogs" sont alors des mondes du jeu que l'on peut modifier.

## Installation

Intructions pour utiliser le serveur Wildfly :
- décompresser le dossier zip du serveur dans ``/tmp``.
- définir la variable $JBOSS_HOME : ``export JBOSS_HOME=/tmp/wildfly-14.0.1.Final``
- (si besoin) définir $JAVA_HOME : ``export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/`` (ou le nom de la version installée sur votre machine)
- lancer le serveur se lance avec la commande ``bash $JBOSS_HOME/bin/standalone.sh``
- copier la database de ``bd/Blogame.db`` dans le répertoire: ``/tmp/bdd/Blogame.db``

## Lancement 
- dans un nouveau terminal refaire ``export JBOSS_HOME=/tmp/wildfly-14.0.1.Final`` puis ``./compile.sh``
- dans votre navigateur préféré aller à ``http://localhost:8080/BloGame/Servlet/CompteServlet``

## Commandes en jeu

- **m**: afficher le chat général (faire ``/<pseudo> <msg>`` pour envoyer un message privé)
- **l**: si connecté en temps qu'admin, certifie la map courante (like)
- **t**: écrire une bulle visible par les autres joueurs dans la map courante (text)
- **c**: revenir en arrière ou fermer une interface ouverte (cancel)
- **b**: revenir à la map principale (come back)
- **space**: intéragir avec l'élément face à soi
- **flèches directionnelles**: se déplacer dans le jeu
- **shift**: maintenir appuyé, courir 
