import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routers/authRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(errorHandler);

export default app;
