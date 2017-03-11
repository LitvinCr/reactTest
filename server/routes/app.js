var express = require('express');
var controllers = require('../controllers/ControllerManager');
var app = express.Router();

app.get('/', controllers.staticFiles.app);
app.use(controllers.staticFiles.app);

module.exports = {
    default: app
};