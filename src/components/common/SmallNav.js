import React from "react";
import Icon from "./Icon";
import ToggleMenu from "./ToggleMenu";
import ModeChangeBtn from "./ModeChangeBtn";

export default function SmallNav() {
  function HandelNavBtn() {
    document.getElementById("line1").classList.toggle("rotate-45");
    document.getElementById("line1").classList.toggle("absolute");
    document.getElementById("line2").classList.toggle("hidden");
    document.getElementById("line3").classList.toggle("-rotate-45");
    document.getElementById("line3").classList.toggle("absolute");
    document.getElementById("togglemenu").classList.toggle("-z-10");
    document.getElementById("togglemenu").classList.toggle("z-10");
    document.getElementById("togglemenu").classList.toggle("opacity-100");
    document.getElementById("toggleBtn").classList.toggle("relative");
    document
      .getElementsByTagName("body")[0]
      .classList.toggle("overflow-hidden");
  }
  return (
    <nav className="_small_nav  dark:bg-black dark:text-white w-full  py-6 grid sm:hidden grid-cols-5 items-center justify-center  capitalize font-serif">
      <button
        id="toggleBtn" title="theme change"
        className="h-full w-fit m-auto flex flex-col z-20 items-start justify-center"
        onClick={HandelNavBtn}
      >
        <span
          id="line1"
          className=" h-1 w-9 transition-all bg-current  block"
        ></span>
        <span
          id="line2"
          className=" h-1 w-9 transition-all bg-current  block my-1"
        ></span>
        <span
          id="line3"
          className=" h-1 w-9 transition-all bg-current block"
        ></span>
      </button>
      <div className=" text-center col-span-3 ">
        <Icon />
      </div>
      <div className="flex justify-end px-6">
        <ModeChangeBtn />
      </div>
      <ToggleMenu />
    </nav>
  );
}
