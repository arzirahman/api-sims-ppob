export interface Pagination<Data> {
    offset: number;
    limit: number;
    records: Data;
}

export interface HttpResponse<Data> {
    status?: number;
    message?: string;
    data?: Data | null | Pagination<Data>;
}