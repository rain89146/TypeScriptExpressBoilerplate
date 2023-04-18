import { NextFunction, Request, Response } from "express";

export default async function Middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    next();
}