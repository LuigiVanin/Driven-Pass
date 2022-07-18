import Cryptr from "cryptr";
import prisma from "../config/database";
import "../config/setup";
import credentialRepository from "../repositories/credentialRepository";
import HttpError from "../utils/exceptions";
import { credentialIdSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const credentialService = {
    crypt: new Cryptr(process.env.CRYPT_KEY || "default"),

    async createCredential(
        label: string,
        url: string,
        password: string,
        username: string,
        userId: number
    ) {
        console.log(label, url, password, username, userId);
        const userHasLabel = await credentialRepository.getItemByUserIdAndLabel(
            label,
            userId
        );
        if (userHasLabel) {
            throw new HttpError(
                StatusCode.Conflict_409,
                "Já existe essa label para seu usuário"
            );
        }
        await credentialRepository.createItem(
            label,
            url,
            password,
            username,
            userId
        );
    },

    async getAll(userId: number) {
        const itens = await credentialRepository.getAllItens(userId);
        return itens.map((item) => {
            return {
                ...item,
                password: this.crypt.decrypt(item.password),
            };
        });
    },

    async getOne(userId: number, credentialId: string | number) {
        const validation = credentialIdSchema.validate(credentialId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        credentialId = validation.value as number;
        const item = await credentialRepository.getItemByUserIdAndId(
            credentialId,
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
        };
    },

    async deleteOne(userId: number, credentialId: string | number) {
        const validation = credentialIdSchema.validate(credentialId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        credentialId = validation.value as number;
        const item = await credentialRepository.getItemByUserIdAndId(
            credentialId,
            userId
        );
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await credentialRepository.deleteItemById(credentialId);
    },
};

export default credentialService;
