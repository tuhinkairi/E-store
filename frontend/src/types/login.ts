export interface login {
    email?:string|null,
    password?:string|null
    token?:string| null
}

export interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
    requestId: string;
}

export interface OnboardingResponse{
    message:string,
    token:string
}