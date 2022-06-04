class ApplicationError extends Error {
    constructor(statusCode, msg, stack) {
        super(statusCode, msg, stack);
        this.statusCode = statusCode;
        this.msg = msg;
        this.stack = stack;
    }
}

module.exports = ApplicationError;