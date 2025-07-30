import React from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../../Features/user/UserSlice";
import { useAppDispatch } from "../../../hook/useStore";

export default function Options() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
  const options = [
    { title: "Profile Settings", path: "/dashboard/profile" },
    { title: "Order History", path: "/dashboard/order" },
    { title: "Wishlist", path: "/dashboard/wishlist" },
    { title: "Payment", path: "/dashboard/payment" },
  ];
  const handleLogout = ()=>{
    dispatch(clearAuth())
  }
  return (
    <div className="_userOptions flex flex-col p-4 border shadow">
      <h2 className="text-lg font-semibold mb-2">User Options</h2>
      {options.map((element) => (
        <button
            onClick={()=>navigate(element.path)}
          key={element.title}
          className="mb-2 p-2 border hover:text-white hover:bg-dark dark:hover:text-dark dark:hover:bg-white"
        >
          {element.title}
        </button>
      ))}
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
