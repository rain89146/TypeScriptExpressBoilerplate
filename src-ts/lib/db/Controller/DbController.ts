import IDbInterface from "../Interfaces/IDbInterface";
import DbQueryObject from "../Objects/DbQueryObject";

export default class DbController {

    //  db client
    private _client: IDbInterface;

    /**
     * create client
     * @param db 
     */
    constructor (db: IDbInterface) {
        this._client = db;
    }

    /**
     * query db
     * @param queryObject 
     * @returns 
     */
    async query (queryObject: DbQueryObject): Promise<any> {
        return await this._client.query(queryObject);
    }
}