import type { OrderResponse } from "../../types/order";
import axiosClient from "../axiosClient";

export default async function getUserOrders():Promise<OrderResponse[] | null>{
    const res= await axiosClient.post("/order/history")
    // console.log("fetch order",res.data.data.orders)
    if (res.data.data.orders) {
        return res.data.data.orders as OrderResponse[];
    }
    return null 
}