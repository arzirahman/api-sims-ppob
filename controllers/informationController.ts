import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import { BannerResponse, BannerResponseData, ServiceResponse, ServiceResponseData } from "../dtos/responses/informationResponse";

export async function banner(req: Request, res: Response, next: NextFunction) {
    try {
        const banners: BannerResponseData[] = await prisma.$queryRaw`
            SELECT banner_name, banner_image, description FROM "Banner"
        `;
        const response: BannerResponse = {
            status: 0,
            message: "Sukses",
            data: banners
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export async function services(req: Request, res: Response, next: NextFunction) {
    try {
        const services: ServiceResponseData[] = await prisma.$queryRaw`
            SELECT service_code, service_name, service_icon, service_tarif FROM "Service"
        `;
        const response: ServiceResponse = {
            status: 0,
            message: "Sukses",
            data: services.map((service) => ({...service, service_tarif: Number(service.service_tarif)}))
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
}