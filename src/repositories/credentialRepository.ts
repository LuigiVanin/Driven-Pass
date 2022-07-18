import Cryptr from "cryptr";
import prisma from "../config/database";

const credentialRepository = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),
    async createItem(
        label: string,
        url: string,
        password: string,
        username: string,
        userId: number
    ) {
        await prisma.credential.create({
            data: {
                label,
                url,
                username,
                password: this.crypt.encrypt(password),
                userId,
            },
        });
    },

    async getItemByUserIdAndLabel(label: string, userId: number) {
        return await prisma.credential.findFirst({
            where: {
                userId,
                label,
            },
        });
    },

    async getAllItens(userId: number) {
        return await prisma.credential.findMany({
            where: {
                userId,
            },
        });
    },

    async getItemByUserIdAndId(credentialId: number, userId: number) {
        const item = await prisma.credential.findFirst({
            where: {
                id: credentialId,
                userId,
            },
        });
        return item;
    },

    async deleteItemById(credentialId: number) {
        await prisma.credential.delete({
            where: {
                id: credentialId,
            },
        });
    },
};

export default credentialRepository;
