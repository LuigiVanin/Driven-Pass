import { CardType } from "@prisma/client";
import Cryptr from "cryptr";
import prisma from "../config/database";
import cardRepository from "../repositories/cardRepository";
import HttpError from "../utils/exceptions";
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
};

export default cardService;
