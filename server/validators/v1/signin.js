'use strict';
var Base = require('./base.js');
var validator = require('./../../utils/bodyValidator');

class SigninValidator extends Base{
    static basic (req, res, next){
        return validator({
            properties: {
                password: {
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    minLength: 8,
                    maxLength: 30
                },
                email: {
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    format: 'email',
                    minLength: 5,
                    maxLength: 100,
                    messages: {
                        format: 'Invalid email'
                    }
                }
            }
        })(req, res, next);
    };

    static facebook (req, res, next){
        return validator({
            properties: {
                accessToken: {
                    required: true,
                    allowEmpty: false,
                    type: 'string'
                }
            }
        })(req, res, next);
    };

    static refresh (req, res, next){
        return validator({
            properties: {
                refreshToken: {
                    required: true,
                    allowEmpty: false,
                    type: 'string'
                }
            }
        })(req, res, next);
    };
}

module.exports = SigninValidator;