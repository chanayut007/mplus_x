class ResponseModel {
    get getStatusCode() {
        return this.statusCode;
    }
    set setStatusCode(value) {
        this.statusCode = value;
    }

    get getStatusMessage() {
        return this.statusMessage;
    }
    set setStatusMessage(value) {
        this.statusMessage = value;
    }

    get getResult() {
        return this.result;
    }
    set setResult(value) {
        this.result = value;
    }
}

module.exports = ResponseModel;