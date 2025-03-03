class GenerateError extends Error {
    status;
    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
    }
};

module.exports = GenerateError;