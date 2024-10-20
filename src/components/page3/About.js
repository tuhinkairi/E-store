import React from 'react'
import WhyWe from './WhyWe'

export default function About() {
  return (
    <main className="space-y-10">
      <section className='banner h-80 content-center '>
          <h1 className='text-5xl font-serif  text-center'>ABOUT US</h1>
          <h3 className='w-1/2 text-center m-auto text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi facere necessitatibus voluptate earum cupiditate id aperiam aspernatur, atque, impedit architecto dolor, harum fuga dicta natus aliquam corporis eveniet corrupti sit.</h3>
      </section>
      <div className='grid grid-cols-2 pt-28'>
        <div className='vesion p-5 place-content-center  text-center'>
          <h1 className='text-3xl py-6'>Our Goals</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio placeat dolorum dolorem voluptatibus consequuntur, illum maxime doloremque repudiandae eius! Tenetur quos quo voluptatem, doloribus quam in atque temporibus consectetur quia?</p>
        </div>
        <div className='p-4 text-center '>
          <img className='h-96 inline-block drop-shadow-glow ' src="https://images.unsplash.com/photo-1639591903821-9b5e38f97bbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRzaGlydHN8ZW58MHx8MHx8fDI%3D" alt="model" />
        </div>
      </div>
      <WhyWe/>   
    </main>
  )
}
