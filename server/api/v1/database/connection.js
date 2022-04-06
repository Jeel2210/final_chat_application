const mysql = require('mysql');

require('dotenv').config();

var dbConfig = {
    host: process.env.HOST,
    user: process.env.NAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    debug: false,
    connectionLimit: process.env.connectionLimit,
    //  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // added for mac configuration
};
const pool = mysql.createPool(dbConfig);

const connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                reject(err);
            // console.log("MySQL pool connected: threadId " + connection.threadId);
            const query = (sql, binding) => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, binding, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            };
            const release = () => {
                return new Promise((resolve, reject) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("MySQL pool released: threadId " + connection.threadId);
                    //                    resolve(connection.release());
                    resolve(connection.destroy());
                });
            };
            resolve({ query, release });
        });
    });
};


const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result, fields) => {
            if (err) {
                console.log('MySQL Error', err);
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = { pool, connection, query };