var express = require('express');
var controllers = require('../controllers/ControllerManager');
var Middlewares = require('../utils/Middlewares');
var app = express.Router();

app.post('/:version/signin/:action', controllers.callAction('signin.signin'));
app.post('/:version/signup/:action', controllers.callAction('signup.signup'));

app.patch('/:version/users/password/restore', controllers.callAction('users.restorePassword'));


app.use(Middlewares.authentication);

/*<=========== USERS ===========>*/
app.get('/:version/users', controllers.callAction('users.getList'));
app.get('/:version/users/:id/profile', controllers.callAction('users.getOne'));

module.exports = {
    default: app
};