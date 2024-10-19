import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtData } from '../dtos/JwtData';
import { Service } from '@prisma/client';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

export const createToken = (payload: any): string => {
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

export const validateToken = (token: string): JwtData | null => {
    try {
        const decoded: JwtData = jwt.verify(token, JWT_SECRET_KEY) as JwtData;
        return decoded;
    } catch (error) {
        return null;
    }
};

export const generateInvoice = (): string => {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const invoiceNumber = `INV${datePart}${randomPart}`;
    return invoiceNumber;
}