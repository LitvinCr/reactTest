"use strict";

var sha256 = require('sha256');
class Password {
    hash(password){
        return sha256.x2(password);
    }
    compare(password, hashedPassword){
        return sha256.x2(password) === hashedPassword
    }
}
module.exports = new Password();