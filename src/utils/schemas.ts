import Joi from "joi";
import { AuthUser } from "./interfaces";

export const authSchema = Joi.object<AuthUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

export const tokenSchema = Joi.string()
    .pattern(/^Bearer /)
    .required();
