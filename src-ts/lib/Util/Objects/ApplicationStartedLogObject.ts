interface IApplicationStartedLogObjectInterface {
    port: number;
    env: string;
    date: string;
}
export class ApplicationStartedLogObject {
    port: number;
    env: string;
    date: string;
    constructor({
        port, 
        env, 
        date
    }: IApplicationStartedLogObjectInterface) {
        this.port = port;
        this.env = env;
        this.date = date;
    }
}