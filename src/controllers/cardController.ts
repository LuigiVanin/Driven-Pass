import { Request, Response } from "express";
import cardService from "../services/cardService";
import { CreateCard, CustomRequest } from "../utils/interfaces";
import { StatusCode } from "../utils/statusCode";

const cardController = {
    async create(req: CustomRequest<CreateCard>, res: Response) {
        const {
            number,
            label,
            fullName,
            cvc,
            type,
            expDate,
            password,
            isVirtual,
        } = req.body;
        const { id: userId } = res.locals.user;
        await cardService.create(
            number,
            label,
            password,
            fullName,
            cvc,
            type,
            expDate,
            isVirtual,
            userId
        );
        return res.status(201).send({ message: "Item criado com sucesso!" });
    },

    async getAll(_: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const cards = await cardService.getAll(userId);
        return res.status(200).send(cards);
    },
    async getOne(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { cardId } = req.params;
        const item = await cardService.getOne(cardId, userId);
        return res.status(200).send(item);
    },

    async delete(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { cardId } = req.params;
        await cardService.deleteOne(cardId, userId);
        return res.status(StatusCode.NoContent_204).send();
    },
};

export default cardController;
