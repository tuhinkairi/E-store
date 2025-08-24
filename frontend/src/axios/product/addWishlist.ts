import type { WishlistResult } from "../../types/wishlist";
import axiosClient from "../axiosClient";

interface WishlistProps {
    productId: string | number,
    preferredColor?:string,
    preferredSize?:string
}

export default async function addWishlist(props:WishlistProps): Promise<WishlistResult | null> {
    const res = await axiosClient.post("/wishlist/add", props)
    console.log(res.data)
    if (res.data.data.items) {
        return res.data.data.items as WishlistResult;
    }
    return null
}