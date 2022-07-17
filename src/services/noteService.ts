import prisma from "../config/database";
import HttpError from "../utils/exceptions";
import { idSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const noteService = {
    async create(note: string, title: string, userId: number) {
        const notes = await prisma.safetyNote.findFirst({
            where: {
                title,
                userId,
            },
        });
        if (notes) {
            throw new HttpError(
                StatusCode.Conflict_409,
                "Já existe essa label para seu usuário"
            );
        }
        await prisma.safetyNote.create({
            data: {
                note,
                title,
                userId,
            },
        });
    },
    async getAll(userId: number) {
        const itens = await prisma.safetyNote.findMany({
            where: {
                userId,
            },
        });

        return itens;
    },

    async getOne(userId: number, noteId: string | number) {
        const validation = idSchema.validate(noteId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        noteId = validation.value as number;
        const item = await prisma.safetyNote.findFirst({
            where: {
                userId,
                id: noteId,
            },
        });
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }

        return item;
    },
    async deleteOne(userId: number, noteId: string | number) {
        const validation = idSchema.validate(noteId);
        if (validation.error) {
            throw new HttpError(
                StatusCode.BadRequest_400,
                "Parâmetro de request mal formado"
            );
        }
        noteId = validation.value as number;
        const item = await prisma.safetyNote.findFirst({
            where: {
                userId,
                id: noteId,
            },
        });
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await prisma.safetyNote.delete({
            where: {
                id: noteId,
            },
        });
    },
};

export default noteService;
