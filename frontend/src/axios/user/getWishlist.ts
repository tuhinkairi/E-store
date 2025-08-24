import type { WishlistResult } from "../../types/wishlist";
import axiosClient from "../axiosClient";

export default async function getWishlist():Promise<WishlistResult[] | null>{
    const res= await axiosClient.get("/wishlist/get")
    //console.log(res.data)
    if (res.data.data.items) {
        return res.data.data.items as WishlistResult[];
    }
    return null 
}