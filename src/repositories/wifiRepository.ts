import Cryptr from "cryptr";
import prisma from "../config/database";

const wifiRepository = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),

    async createItem(
        label: string,
        name: string,
        password: string,
        userId: number
    ) {
        await prisma.wifi.create({
            data: {
                label,
                name,
                password: this.crypt.encrypt(password),
                userId,
            },
        });
    },

    async getItensByUserId(userId: number) {
        return await prisma.wifi.findMany({
            where: {
                userId,
            },
        });
    },

    async getItemByUserIdAndLabel(label: string, userId: number) {
        return await prisma.wifi.findFirst({
            where: {
                label,
                userId,
            },
        });
    },
    async getItemByUserIdAndId(userId: number, wifiId: number) {
        return await prisma.wifi.findFirst({
            where: {
                userId,
                id: wifiId,
            },
        });
    },

    async deleteItemById(wifiId: number) {
        await prisma.wifi.delete({
            where: {
                id: wifiId,
            },
        });
    },
};

export default wifiRepository;
