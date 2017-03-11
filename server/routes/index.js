"use strict";
const appRouter = require('./app');
const apiRouter = require('./api');

module.exports = {
    app: appRouter,
    api: apiRouter
};
