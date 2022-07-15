import { User } from "@prisma/client";
import { Request } from "express";

export interface CustomRequest<T> extends Request {
    body: T;
}

export type AuthUser = Omit<User, "id" | "createdAt">;
