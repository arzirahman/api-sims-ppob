export interface RegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UpdateProfileRequest {
    first_name: string;
    last_name: string;
}