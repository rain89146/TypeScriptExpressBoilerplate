import { NextFunction, Request, Response } from "express";
import Tools from "../../lib/Util/Tools";
import RequestAttribute from "../../lib/Util/Enums/RequestAttribute";
import EventListener from "../../lib/Util/EventListener";
import ApiRequestObject from "../../lib/Util/Objects/ApiRequestObject";
import EventEmitter from "events";

export default async function ApiMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> 
{
    //  parse request object
    const apiRequestObject: ApiRequestObject = Tools.parseExpressRequestObject(req);

    //  get listener
    const listener: EventEmitter = new EventListener().getListener();

    //  add header request object to request
    req[RequestAttribute.HEADER] = apiRequestObject;

    //  add event listener
    req[RequestAttribute.LISTENER] = listener;

    //  move on to next step
    next();
}