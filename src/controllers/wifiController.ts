import { Request, Response } from "express";
import wifiService from "../services/wifiService";
import { CreateWifi, CustomRequest } from "../utils/interfaces";
import { StatusCode } from "../utils/statusCode";

const wifiController = {
    async create(req: CustomRequest<CreateWifi>, res: Response) {
        const { label, name, password } = req.body;
        const { id: userId } = res.locals.user;
        await wifiService.create(label, name, password, userId);
        return res.status(201).send({ message: "Item criado com sucesso!" });
    },

    async getAllItens(_: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const wifies = await wifiService.getAll(userId);
        return res.status(200).send(wifies);
    },

    async getOneItem(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { wifiId } = req.params;
        const wifi = await wifiService.getOne(userId, wifiId);
        return res.status(200).send(wifi);
    },

    async delete(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { wifiId } = req.params;
        await wifiService.deleteOne(userId, wifiId);
        return res.status(StatusCode.NoContent_204).send();
    },
};

export default wifiController;
