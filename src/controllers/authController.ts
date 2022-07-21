import { Response } from "express";
import authService from "../services/authService";
import { AuthUser, CustomRequest } from "../utils/interfaces";

const authController = {
    async signUp(req: CustomRequest<AuthUser>, res: Response) {
        const { email, password } = req.body;
        await authService.signUp(email, password);

        return res.status(201).send({ email, password });
    },

    async signIn(req: CustomRequest<AuthUser>, res: Response) {
        const { email, password } = req.body;

        const token = await authService.signIn(email, password);
        return res.status(201).send({ token });
    },
};

export default authController;
