# React-Express-Typescript ###

## Run With Docker
After clone the project from git, just run
```sh
$ docker-compose up
```

## Run Without Docker
### 1) Installation
For Express API Installaton...
```sh
$ yarn
```
For Client Installation...
```sh
$ cd client-user && yarn
```

### 2) MongoDB Data import
1. User shall install mongoDB localhost and creat a database named 'voting'
2. Create a collection called 'Campaigns' and import data by file 'campaigns.json' in `/dummy_data` folder
3. Create a collection called 'votes' and import data by file 'votes.json' in `/dummy_data` folder

### 3) Install serve
User shall install module serve for client
```sh
$ cd client-user && yarn global add serve
```

### 3) Run The Application 
For Server
```sh
$ yarn server-run
```

For Client
```sh
$ yarn client-run
```

## Swagger
Feel free to use online swagger viewer or simply use VS Code, see API design with `swagger.json`. If you want to view the updated one, run the following command, the updated swagger file will be generated in `/swagger` folder:
```sh
$ yarn swagger
```

## Postman
For using api easily, a postman collection is provided as `TS-Express-Vote-Campaign.postman_collection.json`


### To Be Complete 
1. Unit Test
2. ~~Dockerlize server, client and mongoDB~~
3. Explaination impletement for high traffic
4. ~~Display the most ended campaign~~
5. Use eslint to standardlize code style
