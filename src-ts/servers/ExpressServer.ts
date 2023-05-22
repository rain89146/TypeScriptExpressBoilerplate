import Compression from 'compression';
import express, {Request, Response, Express, NextFunction} from 'express';
import Cors from 'cors';
import Helmet from 'helmet';
import ApiMiddleware from '../middleware/api/ApiMiddleware';
import Winston from '../lib/Util/Winston';
import PlaygroundRouter from '../router/api/playgroundRouter';

export default class ExpressServer {
    private _server: Express;
    private _apiPath: string = `/api/v1`; 

    /**
     * server constructor
     * @param apiPath 
     * @param server 
     */
    constructor(apiPath: string, server: Express) {
        this._server = server;
        this._apiPath = apiPath;
    }

    /**
     * Start express
     */
    initiateExpress(): void {
        this._server
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(Compression())
        .use(Cors({ origin: '*' }))
        .use(Helmet())
        .use(ApiMiddleware)
        .use(`${this._apiPath}/playground`, PlaygroundRouter)
        .post('/', (req: Request, res: Response) => res.sendStatus(403))
        .get('/', (req: Request, res: Response) => res.sendStatus(403))
        .on('error', error => Winston.ErrorLog(error));
    }

    getServer(): Express {
        return this._server;
    }
}