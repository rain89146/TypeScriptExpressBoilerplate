export default class ApiResponseObject {
    result: boolean;
    message: string;
    exception: string;
    response: any;
    constructor({
        result,
        message,
        exception,
        response
    }) {
        this.result = result;
        this.message = message;
        this.exception = exception;
        this.response = response;
    }
}