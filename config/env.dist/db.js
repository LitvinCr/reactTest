var dbConfig = require('../config');
var env = process.env.NODE_ENV || 'dev';
dbConfig = dbConfig[env];

module.exports = {
    host: process.env.DB_HOST || dbConfig.host,
    port: parseInt(process.env.DB_PORT) || 3306,
    dbname: process.env.DB_NAME || dbConfig.database,
    user: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    charset: 'utf8mb4',
    connectionRetryCount: 5,
    maxConnections: 10,
    delayBeforeReconnect: 3000,
    showErrors: true
};