import type { login, LoginResponse } from "../../types/login";
import axiosClient from "../axiosClient";

export default async function LoginEndpoint(data:login):Promise<LoginResponse | null>{
    const res= await axiosClient.post("/user/login",data)
    if (res.data && res.status === 200) {
        return res.data as LoginResponse;
    }
    return null 
}