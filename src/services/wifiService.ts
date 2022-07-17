import Cryptr from "cryptr";
import prisma from "../config/database";
import wifiRepository from "../repositories/wifiRepository";
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
        await wifiRepository.createItem(label, name, password, userId);
    },

    async getAll(userId: number) {
        const itens = await wifiRepository.getItensByUserId(userId);

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
        const item = await wifiRepository.getItemByUserIdAndId(userId, wifiId);
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
        const item = await wifiRepository.getItemByUserIdAndId(userId, wifiId);
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await wifiRepository.deleteItemById(wifiId);
    },
};

export default wifiService;
