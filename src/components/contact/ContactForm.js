import React from "react";

export default function ContactForm() {
  const ClickHandel=(e)=>{
    e.preventDefault()
    e.target.classList.toggle("shadow-md")
    setTimeout(() => {  
      e.target.classList.toggle("shadow-md")
    }, 100);
    console.log("Form submitted")
  }
  return (
    <form className="md:px-4">
      <label htmlFor="name" className=" font-serif capitalize">
        name <span className="text-zinc-400 lowercase text-sm ml-2">( required )</span>
      </label>
      <input
        type="name"
        name="name"
        id="name"
        placeholder="name"
        className="mb-5 mt-2 w-full px-4 py-3 dark:hover:bg-zinc-200 hover:bg-zinc-100 cursor-pointer transition-colors border border-zinc-800"
      />
      <label htmlFor="email" className=" font-serif capitalize">
        email <span className="text-zinc-400 lowercase  text-sm ml-2">( required )</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        className="mb-5 mt-2 w-full px-4 py-3 dark:hover:bg-zinc-200 hover:bg-zinc-100 cursor-pointer transition-colors border border-zinc-800"
      />
      <label htmlFor="subject" className=" font-serif capitalize">
        subject <span className="text-zinc-400 lowercase text-sm ml-2">( required )</span>
      </label>
      <input
        type="text"
        name="subject"
        id="subject"
        placeholder="subject"
        className="mb-5 mt-2 w-full px-4 py-3 dark:hover:bg-zinc-200 hover:bg-zinc-100 cursor-pointer transition-colors border border-zinc-800"
      />
      <label htmlFor="context" className=" font-serif capitalize">
        context <span className="text-zinc-400 lowercase text-sm ml-2">( required )</span>
      </label>
      <textarea
        name="context"
        id="context"
        rows={5}
        placeholder="Describe"
        className="w-full px-4 py-3 mt-2 dark:hover:bg-zinc-200 hover:bg-zinc-100 cursor-pointer transition-colors border border-zinc-800"
      />
      <button type="button" onClick={ClickHandel} className="uppercase block text-center p-5 py-3 border border-zinc-800 mx-auto mt-2 shadow-md hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-400">
        submit
      </button>
    </form>
  );
}
