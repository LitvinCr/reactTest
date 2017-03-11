'use strict';
var Base = require('./base.js');
var validator = require('./../../utils/bodyValidator');
var Models = require('../../models/v1');

class UsersValidator extends Base {

    static sendEmails(req, res, next) {
        return validator({
            properties: {
                users: {
                    required: true,
                    allowEmpty: true,
                    type: 'array'
                },
                message: {
                    required: true,
                    allowEmpty: false,
                    type: 'string'
                },
                subject: {
                    required: true,
                    allowEmpty: false,
                    type: 'string'
                }
            }
        })(req, res, next);
    };

    static email (req, res, next){
        return validator({
            properties: {
                email: {
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    format: 'email',
                    minLength: 5,
                    maxLength: 100
                }
            }
        })(req, res, next);
    };

}
module.exports = UsersValidator;