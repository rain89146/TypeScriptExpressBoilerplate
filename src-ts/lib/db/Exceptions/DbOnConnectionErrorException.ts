export default class DbOnConnectionErrorException extends Error {
    constructor(error: string) {
        super();
        this.name = this.constructor.name;
        this.message = `Database connection error occurs, reason: ${error}`;
    }
}