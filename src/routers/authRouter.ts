import authController from "../controllers/authController";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/signup", authController.signUp);

export default authRouter;
