'use strict';

var Controller = require('./../../utils/controller');
var config = require('./../../../config');
var Models = require('../../models/v1');
var Password = require('./../../utils/password');
var Middlewares = require('./../../utils/Middlewares');

//modules
var FB = require('facebook-node');
var sha256 = require('sha256');

class SigninController extends Controller {
    constructor(version) {
        super(version);

        this.signin = [this._chooseStrategy];
    }

    /**
     * choose signin strategy
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
                self._getUserByEmail,
                Middlewares.createAndSaveRefreshToken,
                Middlewares.createToken,
                self.sendResponse
            ],
            fb: [
                self.validator.signin.facebook,
                self._obtainFacebookUser,
                self._getUserByFbId,
                self._createUser,
                Middlewares.createAndSaveRefreshToken,
                Middlewares.createToken,
                self.sendResponse
            ],

            refresh: [
                self.validator.signin.refresh,
                self._getUserByRefreshToken,
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
     * get user by email
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUserByEmail(req, res, next) {
        Models.users.find(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(function (user) {
            if (!user) {
                let error = new Error();
                error.status = 404;
                error.message = 'User not found';
                return next(error);
            }
            //if hash is not valid catch error
            try {
                var passwordIsValid = Password.compare(req.body.password, user.password);
            } catch (err) {
                let error = new Error();
                error.status = 422;
                error.message = err;
                return next(error);
            }
            //Invalid password
            if (!passwordIsValid) {
                let error = new Error();
                error.status = 401;
                error.message = 'Password does not match';
                return next(error);
            }
            req.user = user;
            next();
        });
    }

    /**
     * get user by FB id
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUserByFbId(req, res, next) {
        Models.users.find({where: {facebookId: req.fbUser.id}}).then(function (user) {
            req.user = user;
            next();
        }).catch(next)
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     * @private
     */
    _createUser(req, res, next) {
        if (!req.user) {
            Models.users.create({
                name: req.fbUser.name,
                facebookId: req.fbUser.id,
                email: req.fbUser.id + '@facebook.com'
            })
                .then(function (user) {
                    req.user = user;
                    next();
                })
                .catch(next)
        } else {
            next();
        }

    }

    /**
     * get facebook user
     * @param req
     * @param res
     * @param next
     * @private
     */
    _obtainFacebookUser(req, res, next) {
        FB.setAccessToken(req.body.accessToken);

        //get fb_user data
        FB.api('/me', {fields: ['id', 'name']}, function (fbUser) {

            if (!fbUser) {
                let error = new Error();
                error.status = 404;
                error.message = 'User not found';
                return next(error);
            }

            if (fbUser.error) {
                fbUser.error.status = 400;
                return next(fbUser.error);
            }

            req.fbUser = fbUser;

            next();
        });
    }

    /**
     * get user by refresh token
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUserByRefreshToken(req, res, next) {

        Models.users.find({
            where: {
                refreshToken: req.body.refreshToken
            }
        })
            .then(function (user) {
                if (!user) {
                    let error = new Error();
                    error.status = 404;
                    error.message = 'User not found';
                    return next(error);
                }

                req.user = user;

                next();
            })
            .catch(next)
    }


}

module.exports = SigninController;