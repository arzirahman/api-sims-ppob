import prisma from "../utils/prisma";
import { Response, NextFunction } from "express";
import { BalanceResponse, BalanceResponseData, HistoryResponse, HistoryResponseData, TransactionResponse } from "../dtos/responses/transactionResponse";
import { AuthenticatedRequest } from "../dtos/requests/authenticatedRequest";
import { TopupRequest } from "../dtos/requests/transactionRequest";
import { History, Service, TransactionType, User } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { generateInvoice } from "../utils/encrypt";

export async function balance(req: AuthenticatedRequest<any>, res: Response, next: NextFunction) {
    try {
        const email = req.data?.email;
        const balances: BalanceResponseData[] = (await prisma.$queryRaw`
            SELECT balance FROM "User" WHERE email = ${email}
        `);
        const response: BalanceResponse = {
            status: 0,
            message: "Sukses",
            data: {
                balance: Number(balances[0]?.balance)
            }
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function topup(req: AuthenticatedRequest<TopupRequest>, res: Response, next: NextFunction) {
    try {
        const email = req.data?.email;
        const { top_up_amount } = req.body as TopupRequest;
        const transactionId = uuidv4();
        const transactionType = TransactionType.TOPUP;
        const amount = parseInt(`${top_up_amount}`, 10);
        const invoiceNumber = generateInvoice();
        const description = "Top Up balance";
        const [balanceInsert, _] = await prisma.$transaction([
                prisma.$queryRaw`
                UPDATE "User"
                SET balance = balance + ${amount}
                WHERE email = ${email}
                RETURNING balance
            `,
            prisma.$queryRaw`
                INSERT INTO "History" 
                    (id, email, invoice_number, transaction_type, total_amount, description)
                VALUES
                    (${transactionId}, ${email}, ${invoiceNumber}, ${transactionType}::"TransactionType", ${amount}, ${description})
                RETURNING created_on
            `
        ]);
        const response: BalanceResponse = {
            status: 0,
            message: "Top Up Balance berhasil",
            data: {
                balance: Number((balanceInsert as User[])?.[0]?.balance)
            }
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function transaction(req: AuthenticatedRequest<any>, res: Response, next: NextFunction){
    try {
        const service: Service = req.extra;
        const transactionId = uuidv4();
        const email = req.data?.email;
        const invoiceNumber = generateInvoice();
        const transactionType = TransactionType.PAYMENT;
        const totalAmount = Number(service.service_tarif);
        const description = service.service_name;

        const [_, historyInsert] = await prisma.$transaction([
            prisma.$queryRaw`
                UPDATE "User"
                SET balance = balance - ${totalAmount}
                WHERE email = ${email}
                RETURNING balance
            `,
            prisma.$queryRaw`
                INSERT INTO "History" 
                    (id, email, invoice_number, transaction_type, total_amount, description)
                VALUES
                    (${transactionId}, ${email}, ${invoiceNumber}, ${transactionType}::"TransactionType", ${totalAmount}, ${description})
                RETURNING created_on
            `
        ]);

        const response: TransactionResponse = {
            status: 0,
            message: "Transaksi berhasil",
            data: {
                invoice_number: invoiceNumber,
                service_code: service.service_code,
                service_name: service.service_name,
                transaction_type: transactionType,
                total_amount: Number(service.service_tarif),
                created_on: (historyInsert as History[])?.[0]?.created_on
            }
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function history(req: AuthenticatedRequest<any>, res: Response, next: NextFunction){
    try {
        const email = req.data?.email;
        const offset = req.query.offset ? parseInt(String(req.query.offset), 10) : 0;
        const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 3;
        const histories: HistoryResponseData[] = await prisma.$queryRaw`
            SELECT invoice_number, transaction_type, description, total_amount, created_on from "History"
            WHERE "History".email = ${email}
            ORDER BY created_on DESC
            OFFSET ${offset}
            Limit ${limit}
        `;
        const response: HistoryResponse = {
            status: 0,
            message: "Top Up Balance berhasil",
            data: {
                offset, 
                limit,
                records: histories.map((history) => ({...history, total_amount: Number(history.total_amount)}))
            }
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}