import React from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-5">
      <h1 className="text-3xl font-semibold">Profile Settings</h1>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="col-span-2">

        <span className="w-40 h-40  flex flex-col gap-1 relative">
          <img
            className="w-full h-full rounded-full border-2 border-gray-300"
            src={""}
            alt=""
            />
          <button className="absolute bottom-0 right-0 text-2xl text-zinc-500"><BiEdit/></button>
        </span>
            </div>
        <span className="flex flex-col gap-1">
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            placeholder="First Name"
            className="border-2 border-gray-300 p-1 rounded"
          />
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            placeholder="Last Name"
            className="border-2 border-gray-300 p-1 rounded"
          />
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            placeholder="Email"
            className="border-2 border-gray-300 p-1 rounded"
          />
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="Phone">Phone</label>
          <input
            type="number"
            id="Phone"
            placeholder="Phone Number"
            className="border-2 border-gray-300 p-1 rounded"
          />
        </span>
        <div className=" flex items-end justify-center col-span-2">
          <button
            onClick={() => navigate("/changepassword")}
            key="Password Change"
            className="shadow p-2 border hover:text-white hover:bg-dark dark:hover:text-dark dark:hover:bg-white rounded"
          >
            Password Change
          </button>
        </div>
        <div className=" flex items-end justify-center col-span-2">
          <button
            onClick={() => navigate("/deleteaccount")}
            key="Delete Account"
            className="shadow p-2 border hover:text-white hover:bg-dark dark:hover:text-dark dark:hover:bg-white rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
