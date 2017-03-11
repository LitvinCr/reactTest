'use strict';

const config = require('./config');
const logger = require('./server/utils/logger');
const app = require('./server');
const https = require('https');
const http = require('http');
const fs = require('fs');
const env = process.env.NODE_ENV || 'dev';

if (env == 'prod') { //https configurations
    let options = {
        key: fs.readFileSync('./cert/https_key.pem'),
        cert: fs.readFileSync('./cert/https_cert.pem')
    };
    https.createServer(options, app).listen(config.server.porthttps, serverStartCallback);

    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(config.server.port);

} else {

    http.createServer(app).listen(config.server.port, serverStartCallback);
}

function serverStartCallback() {

    logger.info("Express server is now live at port " + this.address().port + " with " + env + " config");
}

module.exports = app;



