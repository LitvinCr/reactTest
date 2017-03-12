"use strict";

var bodyParser = require('body-parser');
var ControllerManager = require('./controllers/ControllerManager');
var errorHandler = require('./utils/errorHandler');
var express = require('express');
var cors = require('cors');

//include routes
const router = require('./routes');

//initialize the app
var app = module.exports = express();

app.use(cors());

app.use(express.static(__dirname + '/../frontend'));

//TODO remove static route on production
app.use('/tmp', express.static(__dirname + '/../tmp'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router.api.default);


// app.use('/', express.static(__dirname + '/../frontend/dist/app'));
app.use('/', router.app.default);

//set up http error handler
app.use(errorHandler(app));