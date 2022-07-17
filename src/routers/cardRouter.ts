import { Router } from "express";
import cardController from "../controllers/cardController";
import authentication from "../middlewares/authentication";
import { requestGuard } from "../middlewares/validation";
import { createCardSchema } from "../utils/schemas";

const cardRouter = Router();
cardRouter.post(
    "/",
    requestGuard(createCardSchema),
    authentication,
    cardController.create
);

cardRouter.get("/", authentication, cardController.getAll);
cardRouter.get("/:cardId", authentication, cardController.getOne);
cardRouter.delete("/:cardId", authentication, cardController.delete);

export default cardRouter;
