import { NextFunction, Response } from "express";
import { HttpResponse } from "../dtos/HttpResponse";
import { validateToken } from "../utils/encrypt";
import { AuthenticatedRequest } from "../dtos/requests/authenticatedRequest";

export const auth = (req: AuthenticatedRequest<any>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const response: HttpResponse<any> = {
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json(response);
        return;
    }

    const token = authHeader.split(' ')[1];
    const decodedData = validateToken(token);
    
    if (!decodedData){
        res.status(401).json(response);
    } else {
        req.data = decodedData;
        next();
    }
}