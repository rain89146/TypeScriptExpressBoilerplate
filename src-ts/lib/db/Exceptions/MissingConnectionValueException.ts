export default class MissingConnectionValueException extends Error {
    constructor(missing: string) {
        super();
        this.name = this.constructor.name;
        this.message = `Missing connection value, the value of ${missing} is missing`;
    }
}