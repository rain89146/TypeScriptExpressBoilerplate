import DbController from "./Controller/DbController";
import ConnectionObject from "./Models/ConnectionObject";
import DbQueryObject from "./Objects/DbQueryObject";
import ServerLessMysql from "./Repos/ServerLessMysql";

export default class DatabaseFacet {
    
    //  db controller
    private _controller: DbController;

    /**
     * assign db controller
     * @param conn 
     */
    constructor(conn: ConnectionObject) {
        const serverlessClient = new ServerLessMysql(conn);
        this._controller = new DbController(serverlessClient);
    }

    /**
     * query db
     * @param queryObject 
     * @returns 
     */
    async query(queryObject: DbQueryObject): Promise<any> {
        return await this._controller.query(queryObject);
    }
}