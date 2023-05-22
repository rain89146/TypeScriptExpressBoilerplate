export default class InvalidRequestMethodException extends Error {
    constructor(method: string) {
        super();
        this.name = this.constructor.name;
        this.message = `Invalid http request, ${method} was expected`;
    }
}