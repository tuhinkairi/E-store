import React from "react";
import { useNavigate } from "react-router-dom";

export default function Options() {
    const navigate = useNavigate();
  const options = [
    { title: "Profile Settings", path: "/dashboard/profile" },
    { title: "Order History", path: "/dashboard/order" },
    { title: "Wishlist", path: "/dashboard/wishlist" },
    { title: "Payment", path: "/dashboard/payment" },
  ];
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
      <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
