import React from "react";
import TextAnimation from "./TextAnimation";
export default function Banner() {
  return (
    <div className="py-24 sm:py-32  font-serif text-center ">
      <h1 className="text-4xl sm:text-6xl">
        F/W <br /> Collection
      </h1>
      <div className="text-lg sm:text-2xl mt-3 md:mt-7">
        <TextAnimation />
      </div>
    </div>
  );
}
