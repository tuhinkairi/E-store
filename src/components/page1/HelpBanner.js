import React from "react";

export default function HelpBanner() {
  return (
    <div className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-[url(https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909832-Z1S1ZQPEJVFMVR9JTJFN/2015-07-31-leather-model-01-0081-v3-FINAL-copy.jpg?format=1000w)]">
        <div className=" flex flex-col h-96 justify-end md:w-1/2 p-10 py-16 z-10 text-white space-y-3 font-serif ">
            <h1 className="text-3xl md:text-4xl">The Latest</h1>
            <h1 className="text-lg">Sign up to receive news and updates.</h1>
            <div className="form gap-4 flex flex-wrap items-center pt-6 sm:p-0">
                <input type="text" className="md:w-1/2 py-3 md:py-5 px-3 border text-black" placeholder="Email Address"/>
                <button className="bg-gray-500 hover:bg-gray-600 py-3 md:py-5 px-7  whitespace-nowrap">Sign Up</button>
            </div>
        </div>

    </div>
  );
}
