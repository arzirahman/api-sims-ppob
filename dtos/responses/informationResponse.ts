import { HttpResponse } from "../HttpResponse";

export interface BannerResponseData {
    banner_name: string;
    banner_image: string;
    description: string;
}

export type BannerResponse = HttpResponse<BannerResponseData[]>;

export interface ServiceResponseData {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tarif: number;
}

export type ServiceResponse = HttpResponse<ServiceResponseData[]>;