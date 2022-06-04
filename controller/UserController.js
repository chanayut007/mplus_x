const UserService = require('../services/UserService');
const http = require('../constants/http');
const transformResponseUtil = require('../utils/TransformResponseUtil');
const ApplicationError = require('../model/error/ApplicationError');

class UserController {

    async getUserInformation(req) {
        const { user_id } = req.body;
        //check request value type
        if (typeof user_id !== "number"){
            throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_REQUIRED_MSG);
        }
        console.log("request user_id : "+user_id);
        try {
            let result = await UserService.getUserInformation(user_id);
            return result;
        } catch (error) {
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
        
    }

    async getUserAccount(req) {
        const { user_id } = req.body;
        //check request value type
        if (typeof user_id !== "number"){
            throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_REQUIRED_MSG);
        }
        console.log("request => user_id : "+user_id);
        try {
            let result = await UserService.getUserAccount(user_id);
            return result;
        } catch (error) {
            console.log('Exception: ', error);
            if (error.statusCode) {
                throw new ApplicationError(error.statusCode, error.msg, error.stack);
            }
            throw new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG, error);
        }
    }

    async getLinkRef(req) {
        const { user_id } = req.body;
        //check request value type
        if (typeof user_id !== "number"){
            throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_USER_REQUIRED_MSG);
        }
        try {
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
        const { email, password } = req.body;
        try {
            //check request value type
            if (!email || !password) {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE,  http.HTTP_CLIENT_ERROR_LOGIN_REQUIRED_MSG);
            }
            else if (typeof email !== "string"){
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_EMAIL_REQUIRED_MSG);
            }
            else if (typeof password !== "string") {
                throw new ApplicationError(http.HTTP_CLIENT_ERROR_CODE, http.HTTP_CLIENT_ERROR_PASSWORD_REQUIRED_MSG);
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
    
}

module.exports = new UserController();