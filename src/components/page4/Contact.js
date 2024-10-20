import React from "react";
import ContactForm from "./ContactForm";
import DescriptionContact from "./DescriptionContact";
import HelpBanner from "../page1/HelpBanner";

export default function Contact() {
  return (
    <main className=" ">
      <div className="grid md:grid-cols-2 px-10  lg:px-20 mb-20">
        <DescriptionContact/>
        <ContactForm />
      </div>
      <HelpBanner/>
    </main>
  );
}
