const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const ApplicationError = require('../model/error/ApplicationError');
const http = require('../constants/http');

class UserService {

    async getUserInformation(userId) {
        try { 
            let result = await UserRepository.getUserInformation(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            return result[0];
        } catch (error) {
            //console.log('UserService.getUserInformation() Exception: ', error);
            // if (error.statusCode) {
            //     throw new ApplicationError(error.statusCode, error.msg, error.stack);
            // }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error.stack);
        }
    }

    async getUserAccount(userId) {
        try {
            let data = await UserRepository.getUserAccount(userId);
            if (data.length == 0) {
                return {
                    "wallet": null,
                    "accounts": []
                };
            }
            let allAccount = [];
            for (let i = 0; i < data.length; i++) {
                const account = {
                    "mt4_number": data[i].mt4_no,
                    "account_type": data[i].account_type,
                    "balance": data[i].balance,
                    "leverage": data[i].leverage,
                    "account_name": data[i].full_name,
                    "investor_password": data[i].ta_password
                };
                allAccount.push(account);
            }
            const result = {
                "wallet": data[0].money_net,
                "accounts": allAccount
            };
            return result;
        } catch (error) {
            console.log('UserService.getUserAccount() Exception: ', error);
            if (error.statusCode) {
                console.log(err);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLinkRef(userId) {
        try {
            let result = await UserRepository.getLinkRef(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            return result[0];
        } catch (error) {
            console.log('UserService.getUserAccount() Exception: ', error);
            if (error.statusCode) {
                console.log(err);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLoginUserByEmail(email, password) {
        try {
            let result = await UserRepository.getUserByEmail(email);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            const userData = result[0];
            let { user_pass } = userData;

            const passwordHash = user_pass.replace('$2y$', '$2a$');
            if (!(await bcrypt.compare(password, passwordHash))) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_LOGIN_INVALID_MSG);
            }
            return true;
        } catch (error) {
            console.log('UserService.getLoginUserByEmail() Exception: ', error);
            if (error.statusCode) {
                console.log(error);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }
    

    async logout() {
        try {
            return true;
        } catch (error) {
            console.log('UserService.logout() Exception: ', error);
            if (error.statusCode) {
                console.log(error);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }


    async getUserPin(userId) {
        try {
            let result = await UserRepository.getUserPin(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            return result[0];
        } catch (error) {
            console.log('UserService get user pin exception: ', error);
            if (error.statusCode) {
                console.log(err);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async saveUserPinCode(user_pin_code,userId) {
        try {
            let result = await UserRepository.saveUserPinCode(user_pin_code,userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            return "succesfully";
        } catch (error) {
            console.log('UserService save user pin code exception: ', error);
            if (error.statusCode) {
                console.log(error);
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    // checkPin(pin) {

    //     return true;
    // }

}

module.exports = new UserService();