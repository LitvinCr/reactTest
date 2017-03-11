whats-web
========================

Install project
--------------
- Install npm packages

```sh
$ npm install
```

Config project
--------------

```sh
cp config.json.dist config.json
```

-  For dev
```sh
cp -r env.dist dev
```

-  For prod
```sh
cp -r env.dist prod
```

-  For test
```sh
cp -r env.dist test
```

Run Migrations
--------------

 - For production
```sh
$ node_modules/.bin/sequelize db:migrate --env prod
```

 - For dev
```sh
$ node_modules/.bin/sequelize db:migrate --env dev
```

- For undo
```sh
$ node_modules/.bin/sequelize db:migrate:undo --env dev
```
Install bower
--------------
- Install bower packages

```sh
$ cd frontend/
$ bower install
```

Init base data to database
--------------

```sh
$ npm run init-data
```

Gulp build commands
-------------------

```sh
gulp - default with watch for changes
gulp build - make project dist directory
gulp clean - remove dist directory
```


Config project
--------------

Run Project
--------------
- npm

```sh
$ NODE_ENV=prod npm start
```
- forever

```sh
NODE_ENV=prod forever start app.js
```