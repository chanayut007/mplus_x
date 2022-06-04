const http = require('../../constants/http');
const UserController = require('../../controller/UserController');
const ApplicationError = require('../../model/error/ApplicationError');
const transformResponseUtil = require('../../utils/TransformResponseUtil');

class UserEventRouter {
    async getLoginByEmail(req, res) {
        try {
            console.log(req.body);
            let responseSuccess = await UserController.getLoginByEmail(req);
            res.status(http.HTTP_SUCCESS_CODE).send(responseSuccess);
        } catch (error) {
            console.log('UserEventRouter.loginUserByEmail() error: ', error);
            if (error.statusCode) {
                res.status(error.statusCode).send(error);
            }
            res.status(http.HTTP_INTERNAL_SERVER_CODE).send(
                transformResponseUtil.toResponseError(new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG))
            );
        }
    }

    async getUserInformation(req, res) {
        try {
            console.log(req.body);
            let responseSuccess = await UserController.getUserInformation(req);
            res.status(http.HTTP_SUCCESS_CODE).send(responseSuccess);
        } catch (error) {
            console.log('UserEventRouter.getUserInformation() error: ', error);
            if (error.statusCode) {
                res.status(error.statusCode).send(error);
            }
            res.status(http.HTTP_INTERNAL_SERVER_CODE).send(
                transformResponseUtil.toResponseError(new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG))
            );
        }
    }

    async getUserAccount(req, res) {
        try {
            console.log(req.body);
            let responseSuccess = await UserController.getUserAccount(req);
            res.status(http.HTTP_SUCCESS_CODE).send(responseSuccess);
        } catch (error) {
            console.log('UserEventRouter.getUserAccount() error: ', error);
            if (error.statusCode) {
                res.status(error.statusCode).send(error);
            }
            res.status(http.HTTP_INTERNAL_SERVER_CODE).send(
                transformResponseUtil.toResponseError(new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG))
            );
        }
    }

    async getLinkRef(req, res) {
        try {
            console.log(req.body);
            let responseSuccess = await UserController.getLinkRef(req);
            res.status(http.HTTP_SUCCESS_CODE).send(responseSuccess);
        } catch (error) {
            console.log('UserEventRouter.getLinkRef() error: ', error);
            if (error.statusCode) {
                res.status(error.statusCode).send(error);
            }
            res.status(http.HTTP_INTERNAL_SERVER_CODE).send(
                transformResponseUtil.toResponseError(new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG))
            );
        }
    }

    async logout(req, res) {
        try {
            let responseSuccess = await UserController.logout();
            res.status(http.HTTP_SUCCESS_CODE).send(responseSuccess);
        } catch (error) {
            console.log('UserEventRouter.logout() error: ', error);
            if (error.statusCode) {
                res.status(error.statusCode).send(error);
            }
            res.status(http.HTTP_INTERNAL_SERVER_CODE).send(
                transformResponseUtil.toResponseError(new ApplicationError(http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_CODE, http.HTTP_INTERNAL_SERVER_MSG))
            );
        }
    }

}

module.exports = new UserEventRouter();