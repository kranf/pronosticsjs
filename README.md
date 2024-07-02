## AI project
goal of this project is to get hands on AI and machine learning


It is a horse race pronostics application

## Data source:
https://online.turfinfo.api.pmu.fr/rest/client/1/programme/26052017?meteo=true&specialisation=INTERNET

https://online.turfinfo.api.pmu.fr/rest/client/1/programme/26052021/R1/C1/participants?specialisation=INTERNET

https://online.turfinfo.api.pmu.fr/rest/client/61/programme/16032022/R1/C1/performances-detaillees/pretty


## Overview
Data are scrapped from PMU APIs and stored as is in mongodb (docker) for availability purpose
Data are modelised and moved into RDBMS
Data are transformed into machine input
Machine is trained and is able to predict next winners :)))


## Data scrapping
Raw data are stored as document in mongoDB.

Your mongoDB will be listening on localhost:27017

Once the noSql DB is running, there is a script to scrap data:
```
npm run scrapDate
```
A start date might be specified, the latest scrapping date is used otherwise.

Connect to mongoDB
```
docker exec -it <container-name> mongosh
use pronosticsjs
```

## Data Modeling

The raw data are structured and persisted in RDMS database using ORM.

There is a script to load raw data from mongo. The mongo DB must be running.

End date is optional. It falls back on the current day.  


## Dev env

Databases are made available through docker compose.
Secrets are injected through files expected to found in .secrets directory. One file by secret.
Look at compose.yaml>secrets to check what files are expected to be provided.

```
docker compose up -d

docker compose stop
```

## Data features



Take care to course.categorieParticularite includes "autostart"




## Good to know about horse races

# Music
Codification de la musique au turf

La musique se lit de gauche à droite, la gauche correspondant à la course la plus récente du cheval.

    Les chiffres correspondent aux places d’arrivée du cheval : ils vont de 1 à 9, un 0 signifiant que le cheval est arrivé après la 9ème place (non classé).

    Les lettres minuscules renvoient à la discipline de la course
        (p) = plat
        (m) = trot monté
        (a) = trot attelé
        (o) = obstacles
        (c) = cross
        (h) = haies

    Les lettres majuscules  indiquent les fautes s’il y en a eu :
        (A) = arrêté
        (D) = disqualifié
        (T) = tombé
        (Ret) = rétrogradé
    Les chiffres entre parenthèses donnent l’année de la course : cette donnée est optionnelle car elle n’est pas la plus importante.
