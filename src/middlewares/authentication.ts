import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import HttpError from "../utils/exceptions";
import { tokenSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { authorization } = req.headers as any;
    const validation = tokenSchema.validate(authorization);
    if (validation.error) {
        throw new HttpError(
            StatusCode.UnprocessableEntity_422,
            "Token deve ser informado"
        );
    }
    authorization = authorization.replace("Bearer", "").trim();

    console.log(authorization);

    const key = process.env.JWT_KEY || "default key";
    const { id, iat } = jwt.verify(authorization, key) as any;
    console.log(id);
    // const timeNowInSeconds = Date.now() / 1000;
    // console.log(timeNowInSeconds - iat);
    // if (timeNowInSeconds - iat > 15 * 60) {
    //     return res.status(401).send({ message: "your token is too old!" });
    // }
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new HttpError(
            StatusCode.Anauthorized_401,
            "Problema na authenticação"
        );
    }
    console.log(user);
    next();
};

export default authentication;
