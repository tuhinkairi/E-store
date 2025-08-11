import mongoose from "mongoose";
import OrderSchema from "./Order.js";
import ProductSchema from "./Product.js";
import UserSchema from "./User.js";
import WishlistSchema from "./WishList.js";

export const User = mongoose.model('User', UserSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Order = mongoose.model("Order", OrderSchema);
export const Wishlist = mongoose.model("Wishlist", WishlistSchema);
