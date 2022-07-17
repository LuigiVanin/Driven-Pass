import { Request, Response } from "express";
import noteService from "../services/noteService";
import { CreateNote, CustomRequest } from "../utils/interfaces";
import { StatusCode } from "../utils/statusCode";

const noteController = {
    async createSafetyNote(req: CustomRequest<CreateNote>, res: Response) {
        const { title, note } = req.body;
        const { id: userId } = res.locals.user;
        await noteService.create(note, title, userId);
        return res.status(StatusCode.Created_201).send({
            message: "Item criado com sucesso!",
        });
    },

    async getAllItens(_: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const itens = await noteService.getAll(userId);
        console.log(itens);
        return res.status(200).send(itens);
    },

    async getOneItem(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { noteId } = req.params;
        const item = await noteService.getOne(userId, noteId);
        return res.status(StatusCode.OK_200).send(item);
    },

    async delete(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { noteId } = req.params;
        await noteService.deleteOne(userId, noteId);
        return res.status(StatusCode.NoContent_204).send();
    },
};

export default noteController;
