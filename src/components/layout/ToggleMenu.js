import React from 'react'

export default function ToggleMenu() {
  return (
    <div id='togglemenu' className='w-screen h-screen absolute top-0 -z-10 bg-white dark:bg-black bg-opacity-60 backdrop-blur-sm text-2xl  space-y-7 content-center transition-all '>
      <a className='block text-center hover:underline underline-offset-2' href="/">LookBook</a>
      <a className='block text-center hover:underline underline-offset-2' href="/Shop">Shop</a>
      <a className='block text-center hover:underline underline-offset-2' href="/About">about</a>
      <a className='block text-center hover:underline underline-offset-2' href="/Contact">Contact</a>
      <a className='block text-center hover:underline underline-offset-2' href="/Cart">account</a>
    </div>
  )
}
