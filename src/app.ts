import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routers/authRouter";
import credentialRouter from "./routers/credentialRouter";
import noteRouter from "./routers/noteRouter";
import wifiRouter from "./routers/wifiRouter";
import cardRouter from "./routers/cardRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use("/credential", credentialRouter);
app.use("/notes", noteRouter);
app.use("/wifi", wifiRouter);
app.use("/card", cardRouter);
app.use(errorHandler);

export default app;
