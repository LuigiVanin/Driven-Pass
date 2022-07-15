import { Request, Response } from "express";

const credentialController = {
    test(req: Request, res: Response) {
        return res.send({ req });
    },
};

export default credentialController;
