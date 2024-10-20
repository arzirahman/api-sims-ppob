import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.APP_PORT ?? 4000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'jwt_secret_key';
export const APP_URL = process.env.APP_URL ?? 'http://localhost:4000';