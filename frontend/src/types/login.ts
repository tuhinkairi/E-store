import type { UserProps } from "./user";

export interface login {
    email?:string|null,
    password?:string|null
    token?:string| null
}

export interface LoginResponse {
    message: string;
    token: string;
    user: UserProps;
    requestId: string;
}

export interface OnboardingResponse{
    message:string,
    token:string,
    user:UserProps
}