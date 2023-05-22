import moment from "moment";

export default class Moment
{
    /**
     * Convert date to string
     * @param date 
     * @returns 
     */
    static dateToString(date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Convert date to string with no time string
     * @param date 
     * @returns 
     */
    static dateToStringNoTime(date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).format('YYYY-MM-DD');
    }

    /**
     * Add number of month
     * @param date 
     * @param numOfMon 
     * @returns 
     */
    static dateAddNumOfMonth(numOfMon: number, date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).add(numOfMon, 'months').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Add number of day
     * @param date 
     * @param numOfDay 
     * @returns 
     */
    static dateAddNumOfDay(numOfDay: number, date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).add(numOfDay, 'days').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Add number of day
     * @param date 
     * @param numOfHour 
     * @returns 
     */
    static dateAddNumOfHour(numOfHour: number, date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).add(numOfHour, 'hours').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Add number of day
     * @param date 
     * @param numOfMinute 
     * @returns 
     */
    static dateAddNumOfMinute(numOfMinute: number, date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).add(numOfMinute, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Add number of day
     * @param date 
     * @param numOfSecond 
     * @returns 
     */
    static dateAddNumOfSeconds(numOfSecond: number, date: Date = null): string
    {
        const targetDate = (date) ? date : new Date();
        return moment(targetDate).add(numOfSecond, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Date to timestamp
     * @param date 
     * @returns 
     */
    static dateToTimestamp(date: Date = null) : number
    {
        const targetDate = (date) ? date : new Date();
        return Number(
            moment(targetDate).format('X')
        )
    }
}