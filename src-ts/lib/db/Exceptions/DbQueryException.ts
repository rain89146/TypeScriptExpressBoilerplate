export default class DbQueryException extends Error {
    constructor(error: string) {
        super();
        this.name = this.constructor.name;
        this.message = `Error occurs when querying, reason: ${error}`;
    }
}