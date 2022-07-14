import { Request, Response } from "express";

const authController = {
    signUp(req: Request, res: Response) {
        return res.send({ req: req.body });
    },
};

export default authController;
