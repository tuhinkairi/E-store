import type { UserProps } from "../../types/user";
import axiosClient from "../axiosClient";

export default async function getUser():Promise<UserProps | null>{
    const res= await axiosClient.get("/user/get")
    console.log(res.data)
    if (res.data.current) {
        return res.data.current as UserProps;
    }
    return null 
}