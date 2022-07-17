import { CardType } from "@prisma/client";
import Joi from "joi";
import {
    AuthUser,
    CreateCard,
    CreateCredential,
    CreateNote,
    CreateWifi,
} from "./interfaces";

export const authSchema = Joi.object<AuthUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

export const createCredentialSchema = Joi.object<CreateCredential>({
    label: Joi.string().required(),
    url: Joi.string()
        .pattern(/^http(s)?:\/\//)
        .required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
});

export const createNoteSchema = Joi.object<CreateNote>({
    note: Joi.string().max(1000).required(),
    title: Joi.string().max(50).required(),
});

export const createWifiSchema = Joi.object<CreateWifi>({
    label: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});

export const createCardSchema = Joi.object<CreateCard>({
    cvc: Joi.string()
        .length(3)
        .pattern(/^[0-9]{3}$/)
        .required(),
    fullName: Joi.string().required(),
    label: Joi.string().required(),
    number: Joi.string()
        .length(16)
        .pattern(/^[0-9]{16}$/)
        .required(),
    isVirtual: Joi.boolean().required(),
    password: Joi.string().required(),
    type: Joi.string()
        .valid(CardType.DEBITO, CardType.CREDITO, CardType.AMBOS)
        .required(),
    expDate: Joi.string()
        .pattern(/^[0-9]{2}\/[0-9]{2}$/)
        .required(),
});

export const credentialIdSchema = Joi.number().integer().required();

export const idSchema = Joi.number().integer().required();

export const tokenSchema = Joi.string()
    .pattern(/^Bearer /)
    .required();
