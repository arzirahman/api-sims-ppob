import { HttpResponse } from "../HttpResponse";

export interface LoginResponseData {
    token: string;
}

export type LoginResponse = HttpResponse<LoginResponseData>;

export interface ProfileResponseData {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export type ProfileResponse = HttpResponse<ProfileResponseData>;