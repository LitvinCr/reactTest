'use strict';

//Models
const Models = require('./../models/v1');

//modules
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');

const config = require('./../../config');

const Cache = require('./../utils/redis');

class Middlewares {
    /**
     * auth user
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static authentication(req, res, next) {
        Cache.get(req.headers.authorization, function(err, result){
            if(err) return next(err);

            if(!result){
                let error = new Error();
                error.status = 401;
                error.message = 'not valid token!';
                return next(error);
            }

            try {
                var tokenData = jwt.verify(req.headers.authorization, config.jwtKey);
            } catch (err) {
                let error = new Error();
                error.status = 401;
                error.message = 'not valid token!';
                return next(error);
            }

            if (tokenData.createTime + config.jwtLifeTime < Date.now()) {
                let error = new Error();
                error.status = 401;
                error.message = 'token expired!';
                return next(error);
            }

            Models.users.findById(tokenData.id)
                .then(function (user) {
                    if (!user || user.length === 0) {
                        let error = new Error();
                        error.status = 401;
                        return next(error);
                    }

                    req.user = user;

                    next();
                })
                .catch(next)
        });
    }

    /**
     * create authorization token
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static createToken(req, res, next) {

        let user = req.user;
        let tokenLifeTime = config.jwtLifeTime;
        let tokenParams = {
            createTime: Date.now(),
            id: user.id
        };

        user.dataValues['token'] = jwt.sign(tokenParams, config.jwtKey);
        user.dataValues['tokenExpiresAt'] = new Date(tokenParams.createTime + tokenLifeTime);
        Cache.set(user.dataValues['token'], user.dataValues.id);
        req.payload = Models.users.format().base(user);

        next();
    }

    /**
     * create and update refresh token
     * @param req
     * @param res
     * @param next
     */
    static createAndSaveRefreshToken(req, res, next) {
        req.user.refreshToken = sha256.x2(((Date.now() + req.user.id) * Math.floor(Math.random() * (20 - 2 + 1)) + 2).toString());
        req.user.update({
            refreshToken: req.user.refreshToken
        })
            .then(function (user) {
                next();
            })
            .catch(next)
    }
}



module.exports = Middlewares;