import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest, UpdateProfileRequest } from "../dtos/requests/membershipRequest";
import { HttpResponse } from "../dtos/HttpResponse";
import validator from 'validator';
import { AuthenticatedRequest } from "../dtos/requests/authenticatedRequest";

const validateEmail: (email: string) => string | null  = (email: string) => {
    let message: string | null = null;
    if (!email) {
        message = "Parameter email harus di isi";
    } else if (!validator.isEmail(email)) {
        message = "Parameter email tidak sesuai format";
    }
    return message
}

const validatePassword: (password: string) => string | null  = (password: string) => {
    let message: string | null = null;
    if (!password) {
        message = "Parameter password harus di isi";
    } else if (password.length < 8) {
        message = "Parameter password minimal 8 karakter";
    }
    return message
}

export const registerValidation = (req: Request<RegisterRequest>, res: Response, next: NextFunction) => {
    const { email, first_name, last_name, password } = req.body as RegisterRequest;
    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) {
        errorResponse.message = emailError;
    } else if (!first_name){
        errorResponse.message = "Parameter first_name harus di isi";
    } else if (!last_name){
        errorResponse.message = "Parameter last_name harus di isi";
    } else if (passwordError){
        errorResponse.message = passwordError
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}

export const loginValidation = (req: Request<LoginRequest>, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginRequest;
    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) {
        errorResponse.message = emailError;
    } else if (passwordError){
        errorResponse.message = passwordError
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}

export const updateProfileValidation = (
    req: AuthenticatedRequest<UpdateProfileRequest>, 
    res: Response, next: NextFunction
) => {
    const { first_name, last_name } = req.body as UpdateProfileRequest;

    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    if (!first_name) {
        errorResponse.message = "Parameter first_name harus di isi";
    } else if (!last_name){
        errorResponse.message = "Parameter last_name harus di isi"
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}

export const uploadImageValidation = (req: AuthenticatedRequest<any>, res: Response, next: NextFunction) => {
    const { file } = req;
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    const errorResponse: HttpResponse<any> = {
        status: 102,
        message: '',
        data: null
    }

    if (!file){
        errorResponse.message = "Image tidak boleh kosong";   
    } else if (!allowedMimeTypes.includes(file.mimetype)) {
        errorResponse.message = "Format Image tidak sesuai";
    }

    if (errorResponse.message){
        res.status(400).json(errorResponse);
    } else {
        next();   
    }
}