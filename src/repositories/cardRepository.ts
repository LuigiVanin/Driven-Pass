import { CardType } from "@prisma/client";
import Cryptr from "cryptr";
import prisma from "../config/database";

const cardRepository = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),

    async getItemByUserIdAndLabel(label: string, userId: number) {
        return await prisma.card.findFirst({
            where: {
                userId,
                label,
            },
        });
    },
    async createItem(
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
        await prisma.card.create({
            data: {
                cvc: this.crypt.encrypt(cvc),
                expDate,
                fullName,
                label,
                number,
                password: this.crypt.encrypt(password),
                type,
                userId,
                isVirtual,
            },
        });
    },

    async getAllItens(userId: number) {
        return await prisma.card.findMany({
            where: {
                userId,
            },
        });
    },

    async getItemByUserIdAndId(cardId: number, userId: number) {
        const item = await prisma.card.findFirst({
            where: {
                id: cardId,
                userId,
            },
        });
        return item;
    },

    async deleteItemById(cardId: number) {
        await prisma.card.delete({
            where: {
                id: cardId,
            },
        });
    },
};

export default cardRepository;
