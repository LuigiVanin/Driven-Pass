import prisma from "../config/database";

const noteRepository = {
    async createItem(note: string, title: string, userId: number) {
        await prisma.safetyNote.create({
            data: {
                note,
                title,
                userId,
            },
        });
    },

    async getItemByUserIdAndLabel(title: string, userId: number) {
        return await prisma.safetyNote.findFirst({
            where: {
                title,
                userId,
            },
        });
    },
    async getItemByUserIdAndId(userId: number, noteId: number) {
        return await prisma.safetyNote.findFirst({
            where: {
                userId,
                id: noteId,
            },
        });
    },

    async deleteItemById(noteId: number) {
        await prisma.safetyNote.delete({
            where: {
                id: noteId,
            },
        });
    },
};

export default noteRepository;
