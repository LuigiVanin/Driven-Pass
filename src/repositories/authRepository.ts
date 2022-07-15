import prisma from "../config/database";
import bcrypt from "bcrypt";

const authRepository = {
    async createUser(email: string, password: string) {
        return await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
            },
        });
    },

    async getUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    },
};

export default authRepository;
