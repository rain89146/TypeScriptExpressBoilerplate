export default class MissingApiRequestObject extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "Missing api request object";
    }
}