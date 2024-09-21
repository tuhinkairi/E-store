import React from "react";
import FooterIcons from "../common/FooterIcons";

export default function DescriptionContact() {
  return (
    <div className="font-serif ">
      <h1 className=" text-2xl mt-7">Contact Us</h1>
      <div className=" my-6 md:my-8">
        <h1 className="text-4xl md:text-5xl mb-4 whitespace-pre-wrap">email@email.com</h1>
        <h1 className="text-4xl md:text-5xl mb-4">55555-55555</h1>
        <div className="follow  text-white flex items-center mb-14 md:mt-14 gap-7">
          <FooterIcons />
        </div>
      </div>
    </div>
  );
}
