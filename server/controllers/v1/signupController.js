'use strict';

var Models = require('./../../models/v1');
var Controller = require('./../../utils/controller');
var Password = require('./../../utils/password');
var Middlewares = require('./../../utils/Middlewares');

class SignupController extends Controller {
    constructor(version) {
        super(version);

        this.signup = [this._chooseStrategy];
    }


    /**
     * choose signup strategy
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _chooseStrategy(req, res, next) {
        var self = this;
        var strategies = {
            basic: [
                this.validator.signup.basic,
                self._checkUserExist,
                self._passwordHandler,
                self._saveUser,
                Middlewares.createAndSaveRefreshToken,
                Middlewares.createToken,
                self.sendResponse
            ]
        };

        if (!strategies[req.params.action]) {
            var error = new Error();
            error.status = 404;
            return next(error);
        }

        var operations = strategies[req.params.action].map(function (middleware) {
            return middleware.bind(self, req, res);
        });

        require('async').series(operations, next);
    }

    /**
     * check if user exist api
     * @param req
     * @param res
     * @param next
     * @private
     */
    _checkUserExist(req, res, next) {
        Models.users.find(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(
            function (user) {
                if (user) {
                    let error = new Error();
                    error.message = 'User with this email already registered!';
                    error.status = 409;
                    return next(error);
                }
                req.local = {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    role: Models.users.ROLE().USER
                };
                next()

            }
        )
    }

    /**
     * Password handler
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _passwordHandler(req, res, next) {

        if (req.body.password !== req.body.confirmPassword) {
            let error = new Error();
            error.message = 'Passwords do not match!';
            error.status = 400;
            return next(error);
        }

        req.local.password = Password.hash(req.local.password);

        next();
    }

    /**
     * Crete new user
     * @param req
     * @param res
     * @param next
     * @private
     */
    _saveUser(req, res, next) {

        Models.users.create(req.local)
            .then(function (client) {

                req.user = client;

                next();
            })
            .catch(next);
    }
}

module.exports = SignupController;