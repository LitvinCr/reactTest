'use strict';
var Base = require('./base.js');
var validator = require('./../../utils/bodyValidator');
var Models = require('../../models/v1');

var userRoles = Models.users.ROLE();

class SignupValidator extends Base {

    static basic(req, res, next) {
        return validator({
            properties: {
                name: {
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    minLength: 5
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
                },
                password: {
                    pattern: /^[^\s]+$/,
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    minLength: 8,
                    maxLength: 30
                },
                confirmPassword: {
                    required: true,
                    allowEmpty: false,
                    type: 'string',
                    minLength: 8,
                    maxLength: 30
                }
            }
        })(req, res, next);
    };

}
module.exports = SignupValidator;