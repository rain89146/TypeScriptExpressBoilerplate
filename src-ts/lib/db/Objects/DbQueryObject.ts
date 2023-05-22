export default class DbQueryObject{
    sql: string;
    values: any[]

    constructor({sql, values}:{
        sql: string;
        values: any[]
    }) {
        this.sql = sql;
        this.values = values;
    }
}