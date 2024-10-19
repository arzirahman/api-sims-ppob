export interface TopupRequest {
    top_up_amount: number;
}

export interface HistoryRequest {
    offset: number;
    limit: number;
}

export interface TransactionRequest {
    service_code: string;
}