import Cryptr from "cryptr";
import prisma from "../config/database";
import "../config/setup";
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
        const userHasLabel = await prisma.credential.findFirst({
            where: {
                userId,
                label,
            },
        });
        if (userHasLabel) {
            throw new HttpError(
                StatusCode.Conflict_409,
                "Já existe essa label para seu usuário"
            );
        }
        await prisma.credential.create({
            data: {
                label,
                password: this.crypt.encrypt(password),
                url,
                username,
                userId,
            },
        });
    },

    async getAll(userId: number) {
        const itens = await prisma.credential.findMany({
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

    async getOne(userId: number, credentialId: string | number) {
        const validation = credentialIdSchema.validate(credentialId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        credentialId = validation.value as number;
        const item = await prisma.credential.findFirst({
            where: {
                userId,
                id: credentialId,
            },
        });
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
        const item = await prisma.credential.findFirst({
            where: {
                userId,
                id: credentialId,
            },
        });
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await prisma.credential.delete({
            where: {
                id: credentialId,
            },
        });
    },
};

export default credentialService;
