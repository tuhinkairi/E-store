import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function ShopBanner() {
  const [search_mode, setSearch_mode] = useState("None");
  function DisplayProperty() {
    if (search_mode === "None") {
      setSearch_mode("flex");
    } else {
      setSearch_mode("None");
    }
  }
  return (
    <div className="Banner_Shop py-20  ">
      <h1 className="text-4xl text-center font-serif mb-6 sm:mb-0">Shop</h1>
      <div className="flex justify-center items-center flex-wrap">
        <Link
          to="/o1"
          className="_shopOptions  text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize border-r dark:border-r-white border-r-gray-800 px-4 inline-block hover:bg-gray-800 hover:text-white"
        >
          T-Shirt
        </Link>
        <Link
          to="/o1"
          className="_shopOptions  text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize border-r dark:border-r-white border-r-gray-800 px-4 inline-block hover:bg-gray-800 hover:text-white"
        >
          Hoodis
        </Link>
        <Link
          to="/o1"
          className="_shopOptions  text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize border-r dark:border-r-white border-r-gray-800 px-4 inline-block hover:bg-gray-800 hover:text-white"
        >
          Shorts
        </Link>
        <Link
          to="/o1"
          className="_shopOptions  text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize border-r dark:border-r-white border-r-gray-800 px-4 inline-block hover:bg-gray-800 hover:text-white"
        >
          Caps
        </Link>
        <Link
          to="/o1"
          className="_shopOptions  text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize border-r dark:border-r-white border-r-gray-800 px-4 inline-block hover:bg-gray-800 hover:text-white"
        >
          Garments
        </Link>
        <button
          className="text-sm dark:hover:bg-white dark:hover:text-gray-800 transition-all dark:focus:bg-white dark:focus:text-gray-800 focus:text-white focus:bg-gray-800  mx-1 mt-4 sm:mt-10 capitalize  px-4 inline-block hover:bg-gray-800 hover:text-white"
          onClick={() => DisplayProperty()}
        >
          Search
        </button>
      </div>
      <SearchBar state={search_mode} />
    </div>
  );
}
