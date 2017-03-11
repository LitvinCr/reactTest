Migrations
--------------
Create new migration

```sh
node_modules/.bin/sequelize migration:create --name {name}
```

Run migration

```sh
$ node_modules/.bin/sequelize db:migrate --env {env}
```

Undo migration
```sh
$ node_modules/.bin/sequelize db:migrate:undo --env {env}
```