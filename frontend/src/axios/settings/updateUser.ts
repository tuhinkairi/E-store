import type { UserProps } from "../../types/user";
import axiosClient from "../axiosClient";

export default async function updateUser(user:UserProps):Promise<UserProps | null>{
    const res= await axiosClient.patch("/user/update/",{
        data:user,
    })
    console.log(res.data)
    if (res.data.user) {
        return res.data.user as UserProps;
    }
    return null 
}