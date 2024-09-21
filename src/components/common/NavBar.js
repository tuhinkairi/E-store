import React, { useEffect } from "react";
import Icon from "./Icon";
import SmallNav from "./SmallNav";
import ModeChangeBtn from "./ModeChangeBtn";
import { useLocation } from "react-router-dom";


export default function NavBar() {
  const location = useLocation()
  useEffect(()=>{
    if (location.pathname === '/Login'){
      document.getElementsByTagName("navo")[0].removeChild()
    }
  },[location.pathname])
  return (
    <>
      <nav className="hidden dark:bg-black dark:text-white w-full px-10 py-10 sm:grid grid-cols-5  items-center justify-center  capitalize font-serif ">
        <div className="flex items-center col-span-2 lg:col-span-3 ">
          <Icon />
        </div>
        <div className="grid grid-cols-6 text-center col-span-3 lg:col-span-2 items-center">
          <span className=" block  group  pr-5">
            <a
              href="/"
              className="w-fit  hover:border-b-current border-transparent border-b-2 py-1 inline-block"
            >
              Lookbook
            </a>
          </span>
          <span className=" inline-block group ">
            <a
              href="/Shop"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              shop
            </a>
          </span>
          <span className=" inline-block group">
            <a
              href="/About"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              about
            </a>
          </span>
          <span className=" inline-block group">
            <a
              href="/Contact"
              className="w-fit hover:border-b-current border-transparent border-b-2  py-1 inline-block"
            >
              contact
            </a>
          </span>

          <span className=" inline-block group ml-5">
            <a
              href="/Account"
              className="w-fit py-1 flex items-center justify-center"
            >
              <span className="material-symbols-outlined dark:text-gray-200 scale-110">
                account_circle
              </span>
            </a>
          </span>
          <ModeChangeBtn />
        </div>
      </nav>
      <SmallNav />
    </>
  );
}
