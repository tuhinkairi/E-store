import type { ProductItem } from "../../types/product";
import axiosClient from "../axiosClient";

export default async function getProductById(id?: string): Promise<ProductItem | null> {
    const res = await axiosClient.get("/product/" + id)
    console.log("fasdfasdf",res.data)
    if (res.data.data.product) {
        return res.data.data.product as ProductItem;
    }
    return null
}