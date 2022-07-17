import { User, Credential, SafetyNote, Wifi, Card } from "@prisma/client";
import { Request } from "express";

export interface CustomRequest<T> extends Request {
    body: T;
}

export type AuthUser = Omit<User, "id" | "createdAt">;

export type CreateCredential = Omit<Credential, "id" | "createdAt" | "userId">;

export type CreateNote = Omit<SafetyNote, "id" | "createdAt" | "userId">;

export type CreateWifi = Omit<Wifi, "id" | "createdAt" | "userId">;

export type CreateCard = Omit<Card, "id" | "createdAt" | "userId">;
