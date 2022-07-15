import authController from "../controllers/authController";
import { Router } from "express";
import { requestGuard } from "../middlewares/validation";
import { authSchema } from "../utils/schemas";

const authRouter = Router();

authRouter.post("/signup", requestGuard(authSchema), authController.signUp);
authRouter.post("/signIn", requestGuard(authSchema), authController.signIn);

export default authRouter;
