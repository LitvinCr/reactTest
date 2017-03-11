"use strict";

var fs        = require("fs");
var path      = require("path");

var Validator = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js")&& (file !== "base.js");
    })
    .forEach(function(file) {
        Validator[file.split('.')[0]] = require('./'+file)
    });


module.exports = Validator;

