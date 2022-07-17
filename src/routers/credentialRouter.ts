import { Router } from "express";
import credentialController from "../controllers/credentialController";
import authentication from "../middlewares/authentication";
import { requestGuard } from "../middlewares/validation";
import { createCredentialSchema } from "../utils/schemas";

const credentialRouter = Router();
credentialRouter.post(
    "/",
    requestGuard(createCredentialSchema),
    authentication,
    credentialController.createCredential
);
credentialRouter.get("/", authentication, credentialController.getAllItens);

credentialRouter.get(
    "/:credentialId",
    authentication,
    credentialController.getOneItem
);
credentialRouter.delete(
    "/:credentialId",
    authentication,
    credentialController.delete
);

export default credentialRouter;
