var db = require('./db');

var defaults = {
    server: {
        port: parseInt(process.env.PORT) || 4010,
        host: process.env.HOST || 'localhost'
    },
    db: db,
    jwtKey: 'asdF"e344_=4323deaRdfc__',
    jwtLifeTime: 31556926000,
    jwtAdminLifeTime: 1000 * 60 * 60 * 24,
    avatarsFolder: '/tmp/',
    defaultAvatar: 'default.png',
    uploadFiles: {
        "supportImagesTypes": [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ]
    },
    schoolAvatarSizes: [
        {
            width: 70,
            height: 70
        },
        {
            width: 180,
            height: 180
        }
    ]
};

defaults.server.baseUrl = ['http://', defaults.server.host, ':', defaults.server.port].join('');

module.exports = defaults;