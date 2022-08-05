const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const ApplicationError = require('../model/error/ApplicationError');
const http = require('../constants/http');
//googleapis
const { google } = require("googleapis");

class UserService {

    async getUserInformation(userId) {
        try { 
            let result = await UserRepository.getUserInformation(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_NOT_FOUND_MESSAGE);
            }
            return result[0];
        } catch (error) {
            console.log("UserService.getUserInformation() ", error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserAccount(userId) {
        try {
            let queryUser = await UserRepository.getUserById(userId);
            if (queryUser.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_NOT_FOUND_MESSAGE, http.HTTP_NOT_FOUND_MESSAGE);
            }
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
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLinkRef(userId) {
        try {
            let result = await UserRepository.getLinkRef(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_NOT_FOUND_MESSAGE);
            }
            return result[0];
        } catch (error) {
            console.log('UserService.getUserAccount() Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLoginUserByEmail(email, password) {
        try {
            let result = await UserRepository.getUserByEmail(email);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_INVALID_AUTH_MESSAGE);
            }
            const userData = result[0];
            let { user_id, user_pass } = userData;

            const passwordHash = user_pass.replace('$2y$', '$2a$');
            if (!(await bcrypt.compare(password, passwordHash))) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_INVALID_PASS_MESSAGE);
            }
            return user_id.toString();
        } catch (error) {
            console.log('UserService.getLoginUserByEmail() Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }
    

    async logout() {
        try {
            return true;
        } catch (error) {
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }


    async getUserPin(userId) {
        try {
            let result = await UserRepository.getUserPin(userId);
            if (result.length == 0) {
                throw new ApplicationError(http.HTTP_SUCCESS_CODE, http.HTTP_NOT_FOUND_MESSAGE);
            }
            return result[0].user_pin_code;
        } catch (error) {
            console.log('UserService.getUserPin() Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async saveUserPinCode(user_pin_code,userId) {
        try {
            let queryUser = await UserRepository.getUserById(userId);
            if (queryUser.length == 0) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_DATA_MSG);
            }
            let result = await UserRepository.saveUserPinCode(user_pin_code, userId);

            return "SUCCESS";
        } catch (error) {
            console.log('UserService.saveUserPinCode() Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getSignal(){
        console.log("Started get spread sheet !!");
        try{
            const auth = new google.auth.GoogleAuth({
                keyFile: "config/sheet-key.json", //the key file
                scopes: "https://www.googleapis.com/auth/spreadsheets", //url to spreadsheets API
            });
            //Auth client Object
            const authClientObject = await auth.getClient();

            //Google sheets instance
            const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

            // spreadsheet id
            const spreadsheetId = "1Jpt29oJGu3osJF8kO3GoO1aP5HBJZV9PTJCIVOYm6JE";

            //Read front the spreadsheet
            const readData = await googleSheetsInstance.spreadsheets.values.get({
                auth, //auth object
                spreadsheetId, // spreadsheet id
                range: "แผ่น1!A2:F29", //range of cells to read from.
            })

            //send the data read with the response

            var column = ["currency","pivot","resistance_1","resistance_2","support_1","support_2"];

            var listOfData = readData.data.values;
            var listOfResult =[];
            listOfData.forEach(data => {
                var row = {};
                row[column[0]] = data[0];
                row[column[1]] = data[1];
                row[column[2]] = data[2];
                row[column[3]] = data[3];
                row[column[4]] = data[4];
                row[column[5]] = data[5];
                

                listOfResult.push(row);
            });

            let currentDate = new Date();
            let date = currentDate.getDate()+'/'+ (currentDate.getMonth()+1) + '/' + currentDate.getFullYear();

            return {
                signal_date: date,
                result: listOfResult
            };

        }catch(error){
            console.log(error);
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }
}

module.exports = new UserService();