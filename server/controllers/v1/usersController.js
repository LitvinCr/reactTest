"use strict";

const _ = require('lodash');
const async = require('async');
const Controller = require('./../../utils/controller');
const Models = require('../../models/v1');
const Password = require('./../../utils/password');
const randomstring = require("randomstring");
const logger = require('./../../utils/logger');
const moment = require('moment');

class UsersController extends Controller {
    constructor(version) {
        super(version);

        this.getList = [
            this.validateLimits,
            this._createSearchParams,
            this._getAll
        ];

        this.getOne = [
            this._getOne
        ];

        this.restorePassword = [
            this.validator.users.email,
            this._getUserByEmail,
            this._restorePassword,
            this.sendResponse
        ];
    }

    /**
     * get all users
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getAll(req, res, next) {
        let params = {
            where : req.searchParams
        };

        if(req.query.selectAll){
            try {
                req.query.selectAll = JSON.parse(req.query.selectAll);
            }
            catch (e) {
                let err = new Error();
                err.status = 401;
                err.message = 'Not valid selectAll!';
                return next(err)
            }
        }

        if(!req.query.selectAll){
            params.limit = req.query.limit;
            params.offset = req.query.offset;
        }

        Models.users.findAndCountAll(params)
            .then(function (result) {
                // req.payload = {
                //     count: result.count,
                //     list: Models.users.format().base(result.rows)
                // };

                // next();

                res.send(Models.users.format().base(result.rows));
            })
            .catch(next)
    }

    /**
     * create search params
     * @param req
     * @param res
     * @param next
     * @private
     */
    _createSearchParams(req, res, next){
        req.searchParams = {};

        if(req.query.q){
            req.searchParams['$or'] = [

                {
                    firstName: {
                        $like: '%' + req.query.q + '%'
                    }
                },
                {
                    lastName: {
                        $like: '%' + req.query.q + '%'
                    }
                }

            ]
        }

        req.searchParams.role = {
            $ne: Models.users.ROLE().ADMIN
        };

        next();
    }

    /**
     * get user by id
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getOne(req, res, next) {

        let userId = req.params.id;

        if (userId == 'me') {
            userId = req.user.id;
        }

        Models.users.findById(userId)
            .then(function (user) {
                if (!user) {
                    let err = new Error();
                    err.status = 404;
                    err.message = 'User non found!';
                    return next(err)
                }

                res.send(Models.users.format().base(user));
            })
            .catch(next)
    }

    /**
     * Get user by email
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUserByEmail(req, res, next) {
        Models.users.find({
            where: {
                email: req.body.email
            }
        })
            .then(function (user) {
                if (!user) {
                    let error = new Error();
                    error.status = 404;
                    error.message = 'User not found';
                    return next(error);
                }

                req.local = user;
                next();
            })
            .catch(next)
    }

    /**
     * Generate new user password
     * @param req
     * @param res
     * @param next
     * @private
     */
    _restorePassword(req, res, next) {
        let newPassword = randomstring.generate(10);
        let queryData = {
            password: Password.hash(newPassword)
        };

        Models.users.update(queryData, {
            where: {
                id: req.local.id
            }
        })
            .then(function(user) {
                req.payload = Models.users.format().short(req.local);

                next();
            })
            .catch(next);
    }
}

module.exports = UsersController;
