import mysql, { ServerlessMysql } from "serverless-mysql";
import ConnectionObject from "../Models/ConnectionObject";
import MissingConnectionValueException from "../Exceptions/MissingConnectionValueException";
import DbOnErrorException from "../Exceptions/DbOnErrorException";
import Winston from "../../Util/Winston";
import DbOnConnectionErrorException from "../Exceptions/DbOnConnectionErrorException";
import DbQueryObject from "../Objects/DbQueryObject";
import DbQueryException from "../Exceptions/DbQueryException";
import IDbInterface from "../Interfaces/IDbInterface";

export default class ServerLessMysql implements IDbInterface {

    //
    private client: ServerlessMysql;
    
    /**
     * Connect to DB
     * @param conObject 
     */
    constructor (conObject: ConnectionObject) {
        if (!conObject.host) throw new MissingConnectionValueException('host');
        if (!conObject.user) throw new MissingConnectionValueException('user');
        if (!conObject.password) throw new MissingConnectionValueException('password');

        //
        this.client = mysql({
            config: conObject,
            library: require('mysql2'),
            manageConns: false,
            onError: (err) => {
                Winston.ErrorLog(new DbOnErrorException(JSON.stringify(err)));
            },
            onConnectError: (err) => {
                Winston.ErrorLog(new DbOnConnectionErrorException(JSON.stringify(err)));
            }
        });
    }

    /**
     * DB Query
     * @param queryObj 
     * @returns 
     */
    async query (queryObj: DbQueryObject): Promise<any> {
        try {
            //
            await this.client.connect();

            //  get query result
            const result = await this.client.query(queryObj.sql, queryObj.values);

            //  stop db
            this.client.quit();
            
            //  return query result
            return result;
        
        } catch (error) {

            //  mysql error will have code attribute in it
            if (error.code) throw new DbQueryException(error.sqlMessage);

            //  throw other error
            throw error;   
        }
    } 
}