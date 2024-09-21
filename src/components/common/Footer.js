import React from 'react'
import Icon from './Icon'
import logo from './logo.png'
import FooterIcons from './FooterIcons'
export default function Footer() {
  return (
    <footer className='dark:bg-black dark:text-white flex flex-wrap justify-center sm:grid  sm:grid-cols-3 items-center p-10 '>
        <div className="flex flex-col justify-center items-center sm:items-start sm:h-60">
          <Icon/>
        <div className='my-5'>
          <a className='_footerNav inline-block font-serif text-lg underline hover:text-slate-950 text-slate-600 dark:invert pr-3' href="/">Shop</a>
          <a className='_footerNav inline-block font-serif text-lg underline hover:text-slate-950 text-slate-600 dark:invert pr-3' href="/">About</a>
          <a className='_footerNav inline-block font-serif text-lg underline hover:text-slate-950 text-slate-600 dark:invert ' href="/">Contact Us </a>
        </div>
        <h1 className=''>Made by @TuhinKairi</h1>
      </div>
      <div >
        <img id='_logo' className='dark:invert-0 invert w-64 m-auto h-auto ' src={logo} alt="logo" />
      </div>
    <div className="follow text-center flex justify-end items-center gap-7">
      <FooterIcons/>
</div>
    </footer>
  )
}
