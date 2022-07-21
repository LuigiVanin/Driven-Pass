import app from "../src/app";
import "../src/config/setup";
import { faker } from "@faker-js/faker";
import prisma from "../src/config/database";
import supertest from "supertest";
import bcrypt from "bcrypt";

describe("Test -> Auth Module", () => {
    it("POST /signup", async () => {
        const body = {
            email: faker.internet.email(),
            password: faker.internet.password(10),
        };
        const response = await supertest(app).post("/signup").send(body);
        console.log(response.statusCode);
        expect(response.statusCode).toBe(201);
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        expect(user).not.toBe(null);
    });

    it("POST /signin", async () => {
        const body = {
            email: faker.internet.email(),
            password: faker.internet.password(10),
        };
        await prisma.user.create({
            data: {
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
            },
        });
        const response = await supertest(app).post("/signin").send(body);

        expect(response.statusCode).toBe(201);
    });
});

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});
