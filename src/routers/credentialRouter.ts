import { Router } from "express";
import credentialController from "../controllers/credentialController";
import authentication from "../middlewares/authentication";

const credentialRouter = Router();
credentialRouter.post("/credential", authentication, credentialController.test);

export default credentialRouter;
