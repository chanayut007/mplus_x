class ResponseError {
    get getStatusCode() {
        return this.statusCode
    }
    set setStatusCode(statusCode){
        this.statusCode = statusCode
    }

    get getStatusMessage(){
        return statusMessage 
    }
    set setStatusMessage(statusMessage){
        this.statusMessage = statusMessage
    }

    get getStack(){
        return this.stack
    }
    set setStack(stack){
        this.stack = stack
    }
}

module.exports = ResponseError