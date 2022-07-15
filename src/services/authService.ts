import bcrypt from "bcrypt";
import prisma from "../config/database";
import jwt from "jsonwebtoken";
import HttpError from "../utils/exceptions";
import { StatusCode } from "../utils/statusCode";
import "../config/setup";
import authRepository from "../repositories/authRepository";

const authService = {
    async signUp(email: string, password: string) {
        const userByEmail = await authRepository.getUserByEmail(email);
        if (userByEmail) {
            throw new HttpError(
                StatusCode.Forbidden_403,
                "O usuário com esse email já existe!"
            );
        }
        await authRepository.createUser(email, password);
    },

    async signIn(email: string, password: string) {
        const user = await authRepository.getUserByEmail(email);
        if (!user) {
            throw new HttpError(
                StatusCode.NotFound_404,
                "O usuário com esse email não existe!"
            );
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new HttpError(
                StatusCode.Anauthorized_401,
                "Senha incorreta!"
            );
        }
        const key = process.env.JSON_KEY || "default key";
        const token = jwt.sign({ id: user.id, email: user.email }, key);
        return token;
    },
};

export default authService;
