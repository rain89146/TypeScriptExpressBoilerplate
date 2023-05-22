import winston, {format, Logger} from "winston";

export default class Winston {

    /**
     * Return the winston logger
     * @returns 
     */
    static getTheLogger (): Logger {

        const levels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5,
        }

        //
        const formattedMessage = (info) => {
            const { level, message, timestamp } = info;
            const stringfied = JSON.stringify({ timestamp, level, message });
            return stringfied;
        }

        //  
        const _formatter = format.printf(info => formattedMessage(info));

        //  
        const transports = [
            new winston.transports.Http({
                format: format.combine(_formatter)
            }),
            new winston.transports.Console({
                format: format.combine(_formatter)
            }),
            new winston.transports.File({
                filename: 'eventlog.log',
                format: format.combine(_formatter),
            }),
        ];

        //
        const exceptionTransport = [
            new winston.transports.Console({
                consoleWarnLevels: ['error'],
                format: format.combine(_formatter)
            }),
            new winston.transports.File({
                filename: 'errorlog.log', 
                format: format.combine(_formatter)
            }),
        ]

        //
        const logger = winston.createLogger({
            levels: levels,
            format: format.combine(
                format.simple(),
                format.timestamp(),
                format.prettyPrint(),
                format.errors({stack: true}),
                format.combine(_formatter)
            ),
            transports: transports,
            exceptionHandlers: exceptionTransport,
            rejectionHandlers: [
                new winston.transports.Console({ consoleWarnLevels: ['error'] }),
            ],
        })

        //
        return logger
    }

    /**
     * Info log
     * @param event 
     * @param payload 
     */
    static InfoLog(event: string, payload: any): void {
        //  get the logger
        const logger = this.getTheLogger();
        logger.info({
            event,
            payload,
        });
    }
    
    /**
     * Error log
     * @param error 
     */
    static ErrorLog(error: any): void {
        console.log(error, 96);
        //  get the logger
        const logger = this.getTheLogger();

        //  assemble error object
        const errorObj = new Error();
        errorObj.name = error.name;
        errorObj.message = error.message;
        errorObj.stack = error.stack;

        //  log the error
        logger.error({
            exception: errorObj.name,
            detail: errorObj.message,
            stack: errorObj.stack,
        })
    }

    /**
     * Debug log
     * @param payload 
     */
    static DebugLog(payload: any): void {
        const logger = this.getTheLogger();
        logger.warn({ payload })
    }

    /**
     * Warn log
     * @param payload 
     */
    static WarnLog(payload: any): void {
        const logger = this.getTheLogger();
        logger.warn({ payload });
    }
}