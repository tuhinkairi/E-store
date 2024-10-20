import React from "react";
import { FaTrash } from "react-icons/fa";

export default function OrderCard(params ) {
  return (
    <div className="border rounded-md shadow p-4 mb-4 ">
      <h2 className="text-xl font-semibold">{params.title}</h2>
      <p className="">Quantity: {params.quantity}</p>
      <p className="">Price: ${params.price.toFixed(2)}</p>
      <div className="flex justify-between mt-4">
        <button className="shadow p-2 border hover:text-white hover:bg-dark dark:hover:text-dark dark:hover:bg-white">
          View Details
        </button>
        <button className="shadow rounded p-2 border hover:text-white hover:bg-red-500 dark:hover:text-white dark:hover:bg-red-600">
          <FaTrash/>
        </button>
      </div>
    </div>
  );
}
