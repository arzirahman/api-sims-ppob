import { Request } from "express";
import { JwtData } from "../JwtData";

export interface AuthenticatedRequest<Data> extends Request {
    data?: JwtData;
    body: Data;
    extra?: any;
}