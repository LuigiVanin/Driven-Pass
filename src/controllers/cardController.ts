import { Response } from "express";
import cardService from "../services/cardService";
import { CreateCard, CustomRequest } from "../utils/interfaces";

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
};

export default cardController;
