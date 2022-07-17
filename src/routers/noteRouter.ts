import { Router } from "express";
import noteController from "../controllers/noteController";
import authentication from "../middlewares/authentication";
import { requestGuard } from "../middlewares/validation";
import { createNoteSchema } from "../utils/schemas";

const noteRouter = Router();

noteRouter.post(
    "/",
    requestGuard(createNoteSchema),
    authentication,
    noteController.createSafetyNote
);
noteRouter.get("/", authentication, noteController.getAllItens);

noteRouter.get("/:noteId", authentication, noteController.getOneItem);

noteRouter.delete("/:noteId", authentication, noteController.delete);

export default noteRouter;
