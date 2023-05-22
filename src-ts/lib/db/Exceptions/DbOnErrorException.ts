export default class DbOnErrorException extends Error {
    constructor(error: string) {
        super();
        this.name = this.constructor.name;
        this.message = `Database error occurred, reason: ${error}`
    }
}