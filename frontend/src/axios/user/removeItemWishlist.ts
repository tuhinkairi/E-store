import type { WishlistResult } from "../../types/wishlist";
import axiosClient from "../axiosClient";

export default async function removeItemWishlist(id:string):Promise<WishlistResult[] | null>{
    const res= await axiosClient.delete("/wishlist/remove",{
        data:{"productId": id},
    })
    // console.log(res.data)
    if (res.data.data.items) {
        return res.data.data.items as WishlistResult[];
    }
    return null 
}