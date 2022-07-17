import Cryptr from "cryptr";
import prisma from "../config/database";
import HttpError from "../utils/exceptions";
import { idSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const wifiService = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),

    async create(
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

    async getAll(userId: number) {
        const itens = await prisma.wifi.findMany({
            where: {
                userId,
            },
        });

        return itens.map((item) => {
            return {
                ...item,
                password: this.crypt.decrypt(item.password),
            };
        });
    },

    async getOne(userId: number, wifiId: string | number) {
        const validation = idSchema.validate(wifiId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        wifiId = validation.value as number;
        const item = await prisma.wifi.findFirst({
            where: {
                userId,
                id: wifiId,
            },
        });
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A wifi não existe ou não pertece a você"
            );
        }

        return {
            ...item,
            password: this.crypt.decrypt(item.password),
        };
    },

    async deleteOne(userId: number, wifiId: string | number) {
        const validation = idSchema.validate(wifiId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        wifiId = validation.value as number;
        const item = await prisma.wifi.findFirst({
            where: {
                userId,
                id: wifiId,
            },
        });
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await prisma.wifi.delete({
            where: {
                id: wifiId,
            },
        });
    },
};

export default wifiService;
