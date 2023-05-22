export default class ConnectionObject {
    host: string;
    database: string;
    user: string;
    password: string;
    charset: string;
    constructor({
        host,
        database,
        user,
        password,
        charset
    }) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.charset = charset;
    }
}