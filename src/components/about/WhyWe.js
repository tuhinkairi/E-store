import React from "react";
import AboutHeading from "./AboutHeading";

export default function WhyWe() {
  return (
    <section className="pt-16">
        <AboutHeading text={"Why We ?"}/>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-around items-center text-xl font-bold text-center">
      <div className="grid grid-rows-2 items-center border h-full py-6 odd:bg-gray-100 dark:odd:text-gray-700 shadow border-collapse">
        <h1>
          Premium <br /> Products
        </h1>
        <p className="text-xs font-normal  px-10 text-gary-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          cupiditate quibusdam laborum!
        </p>
      </div>
      <div className="grid grid-rows-2 items-center border h-full py-6 odd:bg-gray-100 dark:odd:text-gray-700 shadow border-collapse">
        <h1>
          Effordable <br /> Price
        </h1>
        <p className="text-xs font-normal  px-10 text-gary-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          cupiditate quibusdam laborum!
        </p>
      </div>
      <div className="grid grid-rows-2 items-center border h-full py-6 odd:bg-gray-100 dark:odd:text-gray-700 shadow border-collapse">
        <h1>High Quality</h1>
        <p className="text-xs font-normal  px-10 text-gary-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          cupiditate quibusdam laborum!
        </p>
      </div>
      <div className="grid grid-rows-2 items-center border h-full py-6 odd:bg-gray-100 dark:odd:text-gray-700 shadow border-collapse">
        <h1>
          Satisfaction <br /> On Top
        </h1>
        <p className="text-xs font-normal  px-10 text-gary-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          cupiditate quibusdam laborum!
        </p>
      </div>
    </div>
    </section>
  );
}
