import type { ProductItem } from "../../types/product";
import axiosClient from "../axiosClient";

export default async function getProduct():Promise<ProductItem[] | null>{
    const res= await axiosClient.get("/product/all")
    console.log(res.data)
    if (res.data.data.products) {
        return res.data.data.products as ProductItem[];
    }
    return null 
}