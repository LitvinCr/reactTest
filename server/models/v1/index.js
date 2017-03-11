"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "dev";
var config    = require("../../../config");

var sequelize = new Sequelize(config.db.dbname, config.db.user, config.db.password, {logging: true});
var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return fs.statSync(path.join(__dirname, file)).isDirectory();
    })
    .forEach(function(file) {

        let patchToModel = path.join(__dirname, file);
        let methods = require(patchToModel + '/methods');
        let format = require(patchToModel + '/format');
        let schema = require(patchToModel + '/schema');
        let modelConfig = require(patchToModel + '/modelConfig');

        methods.format = format;
        modelConfig.classMethods = methods;

        let model = sequelize.importCache[path] = sequelize.define(file, schema(sequelize, Sequelize), modelConfig);

        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
