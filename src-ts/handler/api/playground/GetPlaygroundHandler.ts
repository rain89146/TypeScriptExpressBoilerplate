import { Request, Response } from "express";
import ApiResponseObject from "../../../lib/Util/Objects/ApiResponseObject";
import Winston from "../../../lib/Util/Winston";
import RequestAttribute from "../../../lib/Util/Enums/RequestAttribute";
import InvalidRequestMethodException from "../../../lib/Util/Exceptions/InvalidRequestMethodException";

export default async function GetPlaygroundHandler(req: Request, res: Response): Promise<void> 
{    
    //  load global vars
    const header = req[RequestAttribute.HEADER];
    const listener = req[RequestAttribute.LISTENER];

    try {
        //
        if (header.method !== 'GET') throw new InvalidRequestMethodException('GET');

        //
        const {query} = header;

        //  return success
        res.status(200).json(
            new ApiResponseObject({
                result: true,
                response: query,
                message: null,
                exception: null
            })
        )

    } catch (error) {

        //  Winston logging
        Winston.ErrorLog(error);
        
        //  api returns
        res.status(200).json(
            new ApiResponseObject({
                result: false,
                response: null,
                exception: error.name,
                message: error.message
            })
        );
    }
}