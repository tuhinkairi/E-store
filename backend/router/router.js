import CreateOrder from "../api/Order/CreateOrder.js";
import DeleteOrder from "../api/Order/DeleteOrder.js";
import GetUserOrderHistory from "../api/Order/GetOrderHistory.js";
import GetOrders, { GetOrderById } from "../api/Order/GetOrders.js";
import GetOrderStats from "../api/Order/GetOrderStatus.js";
import UpdateOrder from "../api/Order/UpdateOrder.js";
import CreateProduct from "../api/Product/CreateProduct.js";
import DeleteProduct from "../api/Product/DeleteProduct.js";
import GetAllProduct from "../api/Product/GetAllProduct.js";
import SearchProduct from "../api/Product/SearchProduct.js";
import UpdateProduct from "../api/Product/UpdateProduct.js";
import CreateUser from "../api/User/CreateUser.js";
import DeleteUser from "../api/User/DeleteUser.js";
import GetUser from "../api/User/GetUser.js";
import Logout from "../api/User/LogoutUser.js";
import UpdateUser from "../api/User/UpdateUser.js";
import VerifyUser from "../api/User/VerifyUser.js";
import AddToWishlist from "../api/Wishlist/AddToWishlist.js";
import GetWishlist from "../api/Wishlist/GetWIshList.js";
import RemoveFromWishlist from "../api/Wishlist/RemoveFromWishlist.js";
import UpdateWishlistItem from "../api/Wishlist/UpdateWishlistItem.js";


export default function routerControl(app) {
  // User routes
  CreateUser(app);
  GetUser(app);
  UpdateUser(app);
  DeleteUser(app);
  VerifyUser(app);
  Logout(app)
  // Product routes
  CreateProduct(app);
  GetAllProduct(app);
  SearchProduct(app);
  UpdateProduct(app);
  DeleteProduct(app);

  // User Order
  CreateOrder(app)
  UpdateOrder(app)
  DeleteOrder(app)
  GetOrderStats(app)
  GetUserOrderHistory(app)
  GetOrders(app)
  GetOrderById(app)

  // wishlist
  GetWishlist(app)
  AddToWishlist(app)
  RemoveFromWishlist(app)
  UpdateWishlistItem(app) 
}
