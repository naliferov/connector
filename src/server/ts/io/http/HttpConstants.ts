import {NextFunction, Request, Response} from "express";

interface IHTTPMsg {
    req: Request;
    res: Response,
    next: NextFunction
}