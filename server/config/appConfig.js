require('dotenv').config();

// config.js
module.exports = {
    app: {
        port: process.env.DEV_APP_PORT || 8000,
        appName: process.env.APP_NAME || 'iLrn',
        env: process.env.NODE_ENV || 'development',
        JWT_SECRET: process.env.NODE_ENV || 'z1mox2n92387',
        JWTEXPIRES: 60,
        JWTREFRESHEXPIRES: 120,

    },


};