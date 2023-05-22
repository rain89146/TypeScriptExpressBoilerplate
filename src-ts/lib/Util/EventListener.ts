import EventEmitter from "events";
import Winston from "./Winston";
import Moment from "./Moment";
import Tools from "./Tools";
import Events from "./Enums/Events";
import { ApplicationStartedLogObject } from "./Objects/ApplicationStartedLogObject";

export default class EventListener {
    //
    private _emitter: EventEmitter;
    
    //
    constructor() {
        this._emitter = new EventEmitter();
        this.initializeListener();
    }

    /**
     * Initialize listener
     */
    initializeListener (): void {
        this._emitter.on(Events.APPLICATION_STARTED, (payload: ApplicationStartedLogObject) => {
            Winston.InfoLog(Events.APPLICATION_STARTED, payload);
        });

        this._emitter.on(Events.GLOBAL_API_MIDDLEWARE_ERROR, (error: any) => {
            Winston.ErrorLog(error);
        })
    }

    /**
     * Get the event emitter
     * @returns 
     */
    getListener(): EventEmitter {
        return this._emitter
    }
}