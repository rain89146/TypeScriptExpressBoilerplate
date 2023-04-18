import { Request, Response } from "express";
import ApiResponseObject from "../lib/ApiResponse/object/ApiResponseObject";

export default async function MainHandler(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json(
            new ApiResponseObject({
                result: true,
                response: null,
                exception: null,
                message: null,
            })
        );
    } catch (error) {
        res.status(200).json(
            new ApiResponseObject({
                result: false,
                response: null,
                message: error.message,
                exception: error.name,
            })
        );
    }
}