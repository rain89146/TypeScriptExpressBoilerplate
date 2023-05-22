import { Request, Response } from "express";
import ApiResponseObject from "../../../lib/Util/Objects/ApiResponseObject";
import Winston from "../../../lib/Util/Winston";
import RequestAttribute from "../../../lib/Util/Enums/RequestAttribute";
import ApiRequestObject from "../../../lib/Util/Objects/ApiRequestObject";
import InvalidRequestMethodException from "../../../lib/Util/Exceptions/InvalidRequestMethodException";

export default async function PostPlaygroundHandler(req: Request, res: Response): Promise<void> 
{    
    //  load global vars
    const header: ApiRequestObject = req[RequestAttribute.HEADER];
    const listener = req[RequestAttribute.LISTENER];

    //
    try {
        //
        if (header.method !== 'POST') throw new InvalidRequestMethodException('POST');

        //
        const {body} = header;
        
        
        //  return success
        res.status(200).json(
            new ApiResponseObject({
                result: true,
                response: body,
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