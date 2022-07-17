import prisma from "../config/database";
import noteRepository from "../repositories/noteRepository";
import HttpError from "../utils/exceptions";
import { idSchema } from "../utils/schemas";
import { StatusCode } from "../utils/statusCode";

const noteService = {
    async create(note: string, title: string, userId: number) {
        const notes = await noteRepository.getItemByUserIdAndLabel(
            title,
            userId
        );
        if (notes) {
            throw new HttpError(
                StatusCode.Conflict_409,
                "Já existe essa label para seu usuário"
            );
        }
        await noteRepository.createItem(note, title, userId);
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
        const item = await noteRepository.getItemByUserIdAndId(userId, noteId);
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
        const item = await noteRepository.getItemByUserIdAndId(userId, noteId);
        if (!item) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "A credencial não existe ou não pertece a você"
            );
        }
        await noteRepository.deleteItemById(noteId);
    },
};

export default noteService;
