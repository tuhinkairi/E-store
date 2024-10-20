import React from "react";

export default function Options() {
  const options = ["Profile Settings", "Order History", "Wishlist", "Payment"];
  return (
    <div className="_userOptions flex flex-col p-4 border shadow-md shadow">
      <h2 className="text-lg font-semibold mb-2">User Options</h2>
      {options.map((text) => (
        <button key={text} className="mb-2 p-2 border hover:text-white hover:bg-dark dark:hover:text-dark dark:hover:bg-white">
          {text}
        </button>
      ))}
      <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
