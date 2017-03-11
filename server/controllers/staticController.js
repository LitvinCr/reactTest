var fs = require('fs');
var config = require('../../config');
var async = require('async');
var _ = require('lodash');

function renderStaticHtmlFile (path) {
    return function (req, res, next) {
        fs.createReadStream(__dirname + '/../../frontend/' + path)
            .pipe(res);
    }
}


module.exports = {
    app: renderStaticHtmlFile('dist/app/index.html')
};