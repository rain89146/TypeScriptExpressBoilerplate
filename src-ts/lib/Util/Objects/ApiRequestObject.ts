class AuthObject {
    type: string;
    token: string;
    constructor({
        type,
        token
    }) {
        this.type = type;
        this.token = token;
    }
}

interface IApiRequestObjectInterface {
    userAgent: string|undefined;
    accept: string|undefined;
    host: string|undefined;
    acceptEncoding: string | string[] | undefined;
    cookie: object;
    authorization: string|undefined;
    ip: string;
    url: string;
    method: string;
    statusCode: number|undefined;
    statusMessage: string|undefined;
    referer: string|undefined;
    refererQuery: any;
    body: any;
    query: any;
    domain: string;
    authObject: AuthObject;
}
export default class ApiRequestObject {

    userAgent: string|undefined;
    accept: string|undefined;
    host: string|undefined;
    acceptEncoding: string | string[] | undefined;
    cookie: object;
    authorization: string|undefined;
    ip: string;
    url: string;
    method: string;
    statusCode: number|undefined;
    statusMessage: string|undefined;
    referer: string|undefined;
    refererQuery: any;
    body: any;
    query: any;
    domain: string|undefined;
    authObject: AuthObject;

    constructor({
        userAgent,
        accept,
        host,
        acceptEncoding,
        cookie,
        authorization,
        ip,
        url,
        method,
        statusCode,
        statusMessage,
        referer,
        refererQuery = null,
        body,
        query,
        domain = "",
        authObject,
    }: IApiRequestObjectInterface) {
        this.userAgent = userAgent;
        this.accept = accept;
        this.host = host;
        this.acceptEncoding = acceptEncoding;
        this.cookie = cookie;
        this.authorization = authorization;
        this.ip = ip;
        this.url = url;
        this.method = method;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.referer = referer;
        this.refererQuery = refererQuery;
        this.body = body;
        this.query = query;
        this.domain = domain;
        this.authObject = authObject;
    }
}