'use strict';
var redis = require('redis');
var config = require('./../../config');

let _instance = null;

class Cache {
    constructor() {

        if(!_instance){
            _instance = redis.createClient({
                retry_strategy: function (options) {
                    if (options.error.code === 'ECONNREFUSED') {
                        console.warn('Redis connection has not been established. Reconnecting... Attempt: %s ', options.attempt);
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        console.log('Retry time exhausted');
                    }
                    if (options.attempt >= config.redis.options.max_attempts) {
                        console.error('Web server is going to shut down. Disconnecting...');
                        process.exit(1);
                    }
                    // reconnect after
                    return Math.max(config.redis.options.retry_max_delay);
                }
            });
            _instance.on('connect', function () {
                console.log('Redis successfully connected')
            });
        }

        return _instance;
    }
}

module.exports = new Cache();