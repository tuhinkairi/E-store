import React, { useEffect } from "react";
import Icon from "./Icon";
import SmallNav from "./SmallNav";
import ModeChangeBtn from "./ModeChangeBtn";
import { Link, useLocation } from "react-router-dom";


export default function NavBar() {
  const location = useLocation()
  useEffect(()=>{
    if (location.pathname === '/Login'){
      document.getElementsByTagName("navo")[0].removeChild()
    }
  },[location.pathname])
  return (
    <>
      <nav className="hidden  w-full px-10 py-10 sm:grid grid-cols-5  items-center justify-center  capitalize font-serif ">
        <div className="flex items-center col-span-2 lg:col-span-3 ">
          <Icon />
        </div>
        <div className="grid grid-cols-6 text-center col-span-3 lg:col-span-2 items-center">
          <span className=" block  group  pr-5">
            <Link
              to="/"
              className="w-fit hover:border-b-current border-transparent border-b-2 py-1 inline-block"
            >
              Lookbook
            </Link>
          </span>
          <span className=" inline-block group ">
            <Link
              to="/Shop"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              shop
            </Link>
          </span>
          <span className=" inline-block group">
            <Link
              to="/About"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              about
            </Link>
          </span>
          <span className=" inline-block group">
            <Link
              to="/Contact"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              contact
            </Link>
          </span>

          <span className=" inline-block group ml-5">
            <Link
              to="/Account"
              className="w-fit py-1 flex items-center justify-center"
            >
              <span className="material-symbols-outlined dark:text-gray-200 scale-110">
                account_circle
              </span>
            </Link>
          </span>
          <ModeChangeBtn />
        </div>
      </nav>
      <SmallNav />
    </>
  );
}
