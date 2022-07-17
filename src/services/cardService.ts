import { CardType } from "@prisma/client";
import Cryptr from "cryptr";
import prisma from "../config/database";
import cardRepository from "../repositories/cardRepository";
import HttpError from "../utils/exceptions";
import { idSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const cardService = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),

    async create(
        number: string,
        label: string,
        password: string,
        fullName: string,
        cvc: string,
        type: CardType,
        expDate: string,
        isVirtual: boolean,
        userId: number
    ) {
        const userHasLabel = await cardRepository.getItemByUserIdAndLabel(
            label,
            userId
        );
        if (userHasLabel) {
            throw new HttpError(
                StatusCode.Conflict_409,
                "Já existe essa label para seu usuário"
            );
        }
        await cardRepository.createItem(
            number,
            label,
            password,
            fullName,
            cvc,
            type,
            expDate,
            isVirtual,
            userId
        );
    },

    async getAll(userId: number) {
        const itens = await cardRepository.getAllItens(userId);
        if (!itens) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        return itens.map((item) => {
            return {
                ...item,
                password: this.crypt.decrypt(item.password),
                cvc: this.crypt.decrypt(item.cvc),
            };
        });
    },

    async getOne(cardId: string | number, userId: number) {
        const validation = idSchema.validate(cardId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        const item = await cardRepository.getItemByUserIdAndId(
            validation.value as number,
            userId
        );
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        return {
            ...item,
            password: this.crypt.decrypt(item.password),
            cvc: this.crypt.decrypt(item.cvc),
        };
    },

    async deleteOne(cardId: string | number, userId: number) {
        const validation = idSchema.validate(cardId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        cardId = validation.value as number;
        const item = await cardRepository.getItemByUserIdAndId(cardId, userId);
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await cardRepository.deleteItemById(cardId);
    },
};

export default cardService;
