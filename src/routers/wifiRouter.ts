import { Router } from "express";
import wifiController from "../controllers/wifiController";
import authentication from "../middlewares/authentication";
import { requestGuard } from "../middlewares/validation";
import { createWifiSchema } from "../utils/schemas";

const wifiRouter = Router();
wifiRouter.post(
    "/",
    requestGuard(createWifiSchema),
    authentication,
    wifiController.create
);
wifiRouter.get("/", authentication, wifiController.getAllItens);
wifiRouter.get("/:wifiId", authentication, wifiController.getOneItem);
wifiRouter.delete("/:wifiId", authentication, wifiController.delete);

export default wifiRouter;
