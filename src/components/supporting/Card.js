import React from 'react'
import RedirectProductBtn from '../layout/RedirectProductBtn'

export default function Card(props) {
  return (
    <div className='relative overflow-hidden box-content flex group border-white hover:scale-[102%] transition-all cursor-pointer '>
      <img  className='inline-block w-full bg-center place-self-center transition-all' src={props.url} alt="" />
      <div className='top-0 left-0 h-full w-full group-hover:backdrop-blur-md group-hover:z-10 -z-10 absolute text-white transition-all flex justify-center items-center '>
        
       <RedirectProductBtn product = {props.product}/>
       
      </div> 
    </div>
  )
}
