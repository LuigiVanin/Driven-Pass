import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../utils/exceptions";
import { StatusCode } from "../utils/statusCode";

const errorHandler = (
    error: Error | HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ details: error.details });
    }
    if (error instanceof jwt.JsonWebTokenError) {
        return res
            .status(StatusCode.UnprocessableEntity_422)
            .send("Problema de converter JWT");
    }
    console.log(error);
    return res.status(500).send(error);
};

export default errorHandler;
