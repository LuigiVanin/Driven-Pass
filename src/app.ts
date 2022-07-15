import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routers/authRouter";
import credentialRouter from "./routers/credentialRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(credentialRouter);
app.use(errorHandler);

export default app;
