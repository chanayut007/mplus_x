const ResponseError = require('../model/response/ResponseError');
const ResponseModel = require('../model/response/ResponseModel');

class TransformResponseUtil {
    toResponseError(error) {
        const responseError = new ResponseError();
        responseError.statusCode = error.code;
        responseError.statusMessage = error.msg;
        responseError.stack = error.stack;
        return responseError;
    }

    toResponseSuccess(statusCode, statusMessage) {
        const responseSuccess = new ResponseModel();
        responseSuccess.statusCode = statusCode;
        responseSuccess.statusMessage = statusMessage;
        responseSuccess.result = void 0;
        return responseSuccess;
    }

    toResponseSuccessWithData(statusCode, statusMessage, data) {
        const responseSuccess = new ResponseModel();
        responseSuccess.statusCode = statusCode;
        responseSuccess.statusMessage = statusMessage;
        responseSuccess.result = data;
        return responseSuccess;
    }
}

module.exports = new TransformResponseUtil();