import e, { NextFunction, Request, Response } from "express"
import { LoginRequest, RegisterRequest, UpdateProfileRequest } from "../dtos/requests/membershipRequest";
import { comparePassword, createToken, hashPassword } from "../utils/encrypt";
import prisma from "../utils/prisma";
import { HttpResponse } from "../dtos/HttpResponse";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@prisma/client";
import { LoginResponse, ProfileResponse, ProfileResponseData } from "../dtos/responses/membershipResponse";
import { AuthenticatedRequest } from "../dtos/requests/authenticatedRequest";

export async function register (req: Request<RegisterRequest>, res: Response, next: NextFunction) {
    try {
        const { email, first_name, last_name, password } = req.body as RegisterRequest;        
        const hashedPassword = await hashPassword(password);
        const userId = uuidv4();
        const profileImage = "";

        await prisma.$executeRaw`
            INSERT INTO "User" 
                (id, email, first_name, last_name, password, profile_image) 
            VALUES 
                (${userId}, ${email}, ${first_name}, ${last_name}, ${hashedPassword}, ${profileImage})`;

        const response: HttpResponse<any> = {
            status: 0,
            message: "Registrasi berhasil silahkan login",
            data: null
        }

        res.json(response);
    } catch (error: unknown) {
        if (error instanceof Error) {
            const errorMessage = error.message;
            if (errorMessage.includes('23505')) {
                const response: HttpResponse<any> = {
                    status: 400,
                    message: "Email sudah terdaftar",
                    data: null
                };
                res.status(400).json(response);
                return;
            }
        }
        next(error);
    }
}

export async function login(req: Request<LoginRequest>, res: Response, next: NextFunction){
    try {
        const { email, password } = req.body as LoginRequest;  
        const user = (await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}` as User[])?.[0];
        const response: LoginResponse = {
            status: 103,
            message: "Username atau password salah",
            data: null
        };
        if (!user) {
            res.status(400).json(response);
        } else {
            const validatePassword = await comparePassword(password, user.password);
            if (!validatePassword) {
                res.status(400).json(response);
            } else {
                const token = createToken({ email: user.email });
                response.data = { token };
                response.message = "Login Sukses";
                res.json(response);
            }
        }
    } catch (error: unknown) {
        next(error);
    }
}

export async function profile(req: AuthenticatedRequest<any>, res: Response, next: NextFunction){
    try {
        const email = req.data?.email;
        const user: ProfileResponseData[] = await prisma.$queryRaw`
            SELECT email, first_name, last_name, profile_image FROM "User" WHERE email = ${email}
        `;
        const response: ProfileResponse = {
            status: 103,
            message: "Sukses",
            data: user[0]
        };
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: AuthenticatedRequest<UpdateProfileRequest>, res: Response, next: NextFunction){
    try {
        const email = req.data?.email;
        const { first_name, last_name } = req.body as UpdateProfileRequest;
        const user: ProfileResponseData[] = await prisma.$queryRaw`
            UPDATE "User" SET first_name = ${first_name}, last_name = ${last_name} WHERE email = ${email}
            RETURNING email, first_name, last_name, profile_image
        `;
        const response: ProfileResponse = {
            status: 0,
            message: "Sukses",
            data: user[0]
        };
        res.json(response);
    } catch (error) {
        next(error)
    }
}

export async function uploadImage(req: AuthenticatedRequest<any>, res: Response, next: NextFunction){
    try {
        const originalName = req.file?.originalname ?? "";
        const user: ProfileResponseData[] = await prisma.$queryRaw`
            UPDATE "User" SET profile_image = ${originalName}
            RETURNING email, first_name, last_name, profile_image
        `;
        const response: ProfileResponse = {
            status: 0,
            message: "Sukses",
            data: user[0]
        };
        res.json(response);
    } catch (error) {
        next(error)
    }
}