const UserService = require('../services/UserService');
const http = require('../constants/http');
const transformResponseUtil = require('../utils/TransformResponseUtil');
const ApplicationError = require('../model/error/ApplicationError');

class UserController {

    async getUserInformation(req) {
        try {
            let { user_id } = req.query;
            if (typeof user_id !== "string" || !user_id){
                console.log("bad request");
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT);
            }
            let result = await UserService.getUserInformation(user_id);
            return result;
        } catch (error) {
            console.log('Get User Information Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
        
    }

    async getUserAccount(req) {
        try {
            let { user_id } = req.query;
            if (typeof user_id !== "string"|| !user_id){
                console.log("bad request");
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT);
            }
            console.log("request => user_id : "+user_id);
            let result = await UserService.getUserAccount(user_id);
            return result;
        } catch (error) {
            console.log(' Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLinkRef(req) {
        try {
            let { user_id } = req.query;
            if (typeof user_id !== "string" || !user_id) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_REQUIRED_MSG);
            }
            let result = await UserService.getLinkRef(user_id);
            return result;
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);    
        }
    }

    async getLoginByEmail(req) {
        try {
            let { email, password } = req.body;
            //check request value type
            if (!email || !password) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE,  http.HTTP_CLIENT_ERROR_LOGIN_REQUIRED_MSG);
            }
            else if (typeof email !== "string" || typeof password !== "string"){
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT);
            }

            let result = await UserService.getLoginUserByEmail(email, password);
            return transformResponseUtil.toResponseSuccessWithData(http.HTTP_SUCCESS_CODE, http.HTTP_SUCCESS_MSG, result);
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async logout() {
        try {
            let result = await UserService.logout();
            return transformResponseUtil.toResponseSuccessWithData(http.HTTP_SUCCESS_CODE, http.HTTP_SUCCESS_MSG, result);
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getUserPin(req) {
        try {
            let { user_id } = req.query;
            if (typeof user_id !== "string" || !user_id){
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT);
            }
            let result = await UserService.getUserPin(user_id);
            return transformResponseUtil.toResponseSuccessWithData(http.HTTP_SUCCESS_CODE, http.HTTP_SUCCESS_MSG, result);
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
        
    }

    async saveUserPinCode(req) {
        try {
            let { user_id, user_pin_code } = req.body;

            if (typeof user_id !== "string" || user_pin_code.length != 6){
                console.log("bad request");
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_MSG_INVALID_DATA_FORMAT);
            }
            
            let result = await UserService.saveUserPinCode(user_pin_code,user_id);
            return result;
        } catch (error) {
            console.log('save user pin code exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_CLIENT_ERROR_CODE_INVALID_DATA_FORMAT, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
        
    }

    async getSignal() {
        try {
            let result = await UserService.getSignal();
            return transformResponseUtil.toResponseSuccessWithData(http.HTTP_SUCCESS_CODE, http.HTTP_SUCCESS_MSG, result);
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }
    
}

module.exports = new UserController();