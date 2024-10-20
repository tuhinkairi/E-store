import CreateProduct from "../api/Product/CreateProduct.js";
import DeleteProduct from "../api/Product/DeleteProduct.js";
import GetAllProduct from "../api/Product/GetAllProduct.js";
import SearchProduct from "../api/Product/SearchProduct.js";
import UpdateProduct from "../api/Product/UpdateProduct.js";
import CreateUser from "../api/User/CreateUser.js";
import DeleteUser from "../api/User/DeleteUser.js";
import GetUser from "../api/User/GetUser.js";
import UpdateUser from "../api/User/UpdateUser.js";
import VerifyUser from "../api/User/VerifyUser.js";


export default function routerControl(app) {
  // User routes
  CreateUser(app);
  GetUser(app);
  UpdateUser(app);
  DeleteUser(app);
  VerifyUser(app);
  // Product routes
  CreateProduct(app);
  GetAllProduct(app);
  SearchProduct(app);
  UpdateProduct(app);
  DeleteProduct(app);

}
