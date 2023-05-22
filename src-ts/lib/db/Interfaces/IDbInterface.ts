import DbQueryObject from "../Objects/DbQueryObject";

export default interface IDbInterface {
    query (queryObj: DbQueryObject): Promise<any>
}