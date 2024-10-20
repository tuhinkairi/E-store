import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const location = useLocation()
  useEffect((e)=>{
    if (location.pathname === '/Login'){
    }
  },[location.pathname])
  return (
    <main className='w-screen max-h-screen overflow-hidden'>
      
       
      
    </main>
  )
}
