import CreateUser from "../api/User/CreateUser.js";
import DeleteUser from "../api/User/DeleteUser.js";
import GetUser from "../api/User/GetUser.js";
import UpdateUser from "../api/User/UpdateUser.js";
import VerifyUser from "../api/User/VerifyUser.js";


export default function routerControl(app) {
  CreateUser(app);
  GetUser(app);
  UpdateUser(app);
  DeleteUser(app);
  VerifyUser(app)

}
