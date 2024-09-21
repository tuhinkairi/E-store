import React from "react";
import SearchIcon from "../supporting/SearchIcon";

export default function SearchBar(props) {
  return (
    <div className="mt-7 flex items-center justify-center mx-6" style={{display:props.state}} >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="text-gray-700 block w-full sm:w-1/2 p-3 outline-none rounded-none border border-gray-800"
      />
      <button id="searchBtn" className=" w-fit block dark:invert overflow-hidden ml-3"><SearchIcon/></button>
    </div>
  );
}
