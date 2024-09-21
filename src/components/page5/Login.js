import React, { useEffect } from 'react'
import BgCarousel from './BgCarousel'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const location = useLocation()
  useEffect((e)=>{
    if (location.pathname === '/Login'){
    }
  },[location.pathname])
  return (
    <main className='w-screen h-screen overflow-hidden'>
      <section  >
<BgCarousel/>
      </section>
       
      
    </main>
  )
}
