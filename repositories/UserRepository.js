const e = require('express');
const http = require('../constants/http');
const ApplicationError = require('../model/error/ApplicationError');
const MySQLConnector = require('../module/MySQLConnector');

class UserRepository {

    async getUserByEmail(email) {
        try {
            let connection = await MySQLConnector.getConnection();
            return await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM account.bk_user_account WHERE user_email = ?;', 
                [email],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log('UserRepository.getUserByEmail() Exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserById(userId) {
        try {
            let connection = await MySQLConnector.getConnection();
            return await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM account.bk_user_account WHERE user_id = ?',
                [userId],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log('UserRepository.getUserById() Exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserPin(userId) {
        try {
            let connection = await MySQLConnector.getConnection();
           
            return await new Promise((resolve, reject) => {
                //"SELECT  user_id, user_fullname, \n (concat(d_code_phone,substr(user_phone,2))) as mobile_no, \n user_email, concat(concat(concat(substr(user_birthday,9),\'/\') , concat(substr(user_birthday,6,2),\'/\') ) , substr(user_birthday,1,4)) as user_birthday,\n user_sex, user_nationality,concat(concat(concat(concat(user_address,\" \"),concat(user_state,\" \")) , concat(user_city,\" \")),user_zipcode) as address \n from account.bk_user_account buc \n where buc.user_id = ?"
                connection.query("SELECT user_pin_code FROM `bk_user_account` WHERE user_id = ?;",
                [userId],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log("Repository Error: " ,error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async saveUserPinCode(userPinCode,userId) {
        try {
            let connection = await MySQLConnector.getConnection();
           
            return await new Promise((resolve, reject) => {
                connection.query("UPDATE bk_user_account SET user_pin_code = ? WHERE user_id = ?;",
                [userPinCode, userId],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log('User repository => get user pin exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserInformation(userId) {
        try {
            let connection = await MySQLConnector.getConnection();
           
            return await new Promise((resolve, reject) => {
                //"SELECT  user_id, user_fullname, \n (concat(d_code_phone,substr(user_phone,2))) as mobile_no, \n user_email, concat(concat(concat(substr(user_birthday,9),\'/\') , concat(substr(user_birthday,6,2),\'/\') ) , substr(user_birthday,1,4)) as user_birthday,\n user_sex, user_nationality,concat(concat(concat(concat(user_address,\" \"),concat(user_state,\" \")) , concat(user_city,\" \")),user_zipcode) as address \n from account.bk_user_account buc \n where buc.user_id = ?"
                connection.query("SELECT  user_id, user_fullname, d_code_phone, user_phone as mobile_no, user_email, concat(concat(concat(substr(user_birthday,9),\'/\') , concat(substr(user_birthday,6,2),\'/\') ) , substr(user_birthday,1,4)) as user_birthday, user_sex, user_nationality,concat(concat(concat(concat(user_address,\" \"), concat(user_state,\" \")), concat(user_city,\" \")),user_zipcode) as address from account.bk_user_account buc where buc.user_id = ?;",
                [userId],
                (err, result) => {
                    connection.release();
                    if (err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error) {
            console.log('UserRepository.getUserInformation() Exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserAccount(userId) {
        try {
            let connection = await MySQLConnector.getConnection();
            return await new Promise((resolve, reject) => {
                connection.query("SELECT (ta.ta_login) as mt4_no, (ta.ta_group) as account_type,  ta.ta_balance as balance, (bwb.money_net) as money_net, (ta.ta_leverage) as leverage, (bua.user_fullname) as full_name ,ta.ta_password \n from reportserver.mt4_users mtu JOIN mt4.treder_account ta ON mtu.LOGIN = ta.ta_login , account.bk_user_account bua, wallet.bk_wallet_balance bwb \n where ta.user_id = ? && bua.user_id = ? && bwb.user_id = ? && ta.status = \'open\';",
                [userId, userId, userId],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log('UserRepository.getUserAccount() Exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLinkRef(userId) {
        try {
            let connection = await MySQLConnector.getConnection();
            return await new Promise((resolve, reject) => {
                connection.query("SELECT (concat(\'https://www.mplusfx.com/ref=\',buc.user_refname)) as link_ref ,(bwb.commission_market) as commission FROM wallet.bk_wallet_balance bwb, account.bk_user_account buc \n WHERE bwb.user_id = ? && buc.user_id = ?;",
                [userId, userId],
                (err, result) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } catch (error) {
            console.log('UserRepository.getLinkRef() Exception: ', error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }
}

module.exports = new UserRepository();