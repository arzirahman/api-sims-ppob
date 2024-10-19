import { HttpResponse } from "../HttpResponse";

export interface BalanceResponseData {
    balance: number;
}

export type BalanceResponse = HttpResponse<BalanceResponseData>;

export interface HistoryResponseData {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
}

export type HistoryResponse = HttpResponse<HistoryResponseData[]>;

export interface TransactionResponseData {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: Date;
}

export type TransactionResponse = HttpResponse<TransactionResponseData>;