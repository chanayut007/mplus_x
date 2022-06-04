const mysql = require('mysql');
const config = require('../config/config');

class MySQLConnector {

    #dbUserAccount = mysql.createPool(config.dbUserAccount);

    async getConnection() {
        try {
            return await new Promise((resolve, reject) => {
                this.#dbUserAccount.getConnection((err, connection) => {
                    if (err){
                        reject(`Error Connect Database: ${err}`);
                    } else {
                        resolve(connection);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MySQLConnector();