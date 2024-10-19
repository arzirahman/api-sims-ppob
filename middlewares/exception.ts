import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../dtos/HttpResponse';

export const exception = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    const errorResponse: HttpResponse<any> = {
        status: 500,
        message: 'Internal Server Error',
        data: null
    };
    res.status(errorResponse?.status ?? 500).json(errorResponse);
};