"use strict";

class Controller {
    constructor(version) {
        this.version = version;

        /**
         * validate skip and count parameters for getting any resource
         *
         * @param req
         * @param res
         * @param next
         *
         * @returns {*}
         *
         * @private
         */
        this.validateLimits = function (req, res, next) {
            req.query.limit = Math.abs(parseInt(req.query.limit)) ? Math.abs((parseInt(req.query.limit))) : 50;
            req.query.offset = Math.abs(parseInt(req.query.offset)) ? Math.abs(parseInt(req.query.offset)) : 0;

            return next();
        };

        /**
         * Universal response sender
         * @param req
         * @param res
         * @param next
         * @returns {*}
         */
        this.sendResponse = function (req, res, next) {
            if (!req.payload) return res.status(204).end();
            let result = {};
            let count = req.count;
            let payload = req.payload;
            if (Array.isArray(payload)) {
                if (typeof count === 'function') {
                    return count().then(count => res.status(200).send({count, payload})).catch(next);
                }
                result.count = count ? count : payload.length;
            }
            result.payload = payload;
            res.status(200).send(result);
        };

        this.validator = require('../validators/' + version)
    }
}

module.exports = Controller;