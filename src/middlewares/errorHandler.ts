import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/exceptions";

const errorHandler = (
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ details: error.details });
    }
};

export default errorHandler;
