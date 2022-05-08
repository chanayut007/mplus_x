const mysql = require('mysql');
const config = require('../config/config');

const dbUserAccount = mysql.createPool(config.dbUserAccount);

dbUserAccount.getConnection((err) => {
    if (!err) {
        console.log("Database is Connected!");
    } else {
        console.log(`Database is Error ${err}`);
    }
});

module.exports = dbUserAccount;