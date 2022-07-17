import { Request, Response } from "express";
import credentialService from "../services/credentialService";
import { CreateCredential, CustomRequest } from "../utils/interfaces";
import { StatusCode } from "../utils/statusCode";

const credentialController = {
    async createCredential(
        req: CustomRequest<CreateCredential>,
        res: Response
    ) {
        const { id: userId } = res.locals.user;
        const { label, url, password, username } = req.body;
        await credentialService.createCredential(
            label,
            url,
            password,
            username,
            userId
        );
        return res
            .status(StatusCode.Created_201)
            .send({ message: "Credencial criada com sucesso!" });
    },

    async getAllItens(_: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const itens = await credentialService.getAll(userId);
        console.log(itens);
        return res.status(200).send(itens);
    },

    async getOneItem(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { credentialId } = req.params;
        const item = await credentialService.getOne(userId, credentialId);
        return res.status(StatusCode.OK_200).send(item);
    },

    async delete(req: Request, res: Response) {
        const { id: userId } = res.locals.user;
        const { credentialId } = req.params;
        await credentialService.deleteOne(userId, credentialId);
        return res.status(StatusCode.NoContent_204).send();
    },
};

export default credentialController;
