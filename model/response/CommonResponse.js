class CommonResponse {
    get getStatusCode(){
        return this.statusCode;
    }

    set getStatusCode(statusCode){
        this.statusCode = statusCode;
    }

    get setStatusMessage(){
        return this.statusMessage;
    }

    set setStatusMessage(statusMessage){
        this.statusMessage = statusMessage
    }

    get getResult(){
        return this.result
    }

    set setResult(result){
        this.result = result
    }
}
module.exports = CommonResponse;