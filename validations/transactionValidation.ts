import { NextFunction, Response } from "express";
import { TopupRequest, TransactionRequest } from "../dtos/requests/transactionRequest";
import { HttpResponse } from "../dtos/HttpResponse";
import { AuthenticatedRequest } from "../dtos/requests/authenticatedRequest";
import validator from "validator";
import { TransactionResponse } from "../dtos/responses/transactionResponse";
import prisma from "../utils/prisma";
import { Service, User } from "@prisma/client";

export const topupValidation = (req: AuthenticatedRequest<TopupRequest>, res: Response, next: NextFunction) => {
    const { top_up_amount } = req.body as TopupRequest;
    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    if (!top_up_amount){
        errorResponse.message = "Parameter top_up_amount harus di isi";
    } else if (!validator.isNumeric(`${top_up_amount}`) || Number(top_up_amount) < 1){
        errorResponse.message = "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0";
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}

export const transactionValidation = async (req: AuthenticatedRequest<TransactionRequest>, res: Response, next: NextFunction) => {
    const { service_code } = req.body as TransactionRequest;
    const email = req.data?.email;

    const errorResponse: TransactionResponse = {
        status: 102,
        message: '',
        data: null
    }

    if (!service_code){
        errorResponse.message = "Parameter service_code harus di isi";
    } else {
        const service: Service[] = await prisma.$queryRaw`
            SELECT * FROM "Service" WHERE service_code = ${service_code};
        `;
        if (!service[0]) {
            errorResponse.message = "Service atau Layanan tidak ditemukan";
        } else {
            const user: User[] = await prisma.$queryRaw`
                SELECT balance FROM "User" WHERE email = ${email}
            `;
            if (user[0].balance < service[0].service_tarif){
                errorResponse.message = "Saldo tidak mencukupi";
            }
            req.extra = service[0];
        }
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}

export const historyValidation = (req: AuthenticatedRequest<any>, res: Response, next: NextFunction) => {
    const offset = String(req.query.offset);
    const limit = String(req.query.limit);

    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    if (offset && !validator.isNumeric(offset) && Number(offset) < 0){
        errorResponse.message = "Parameter offset harus angka dan tidak boleh lebih kecil dari 0";
    } else if (limit && !validator.isNumeric(limit) && Number(limit) < 0){
        errorResponse.message = "Parameter limit harus angka dan tidak boleh lebih kecil dari 0";
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}