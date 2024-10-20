import React from 'react'

export default function ProfileInfo(params) {
    
  return (
    <div className='flex items-center text-sm gap-5 border p-2 shadow'>
      <img className='w-16 h-16 rounded-full border-2 border-gray-300'  src={""} alt="" />
      <div>
        <h1>User Name</h1>
        <p>user@gmail.com</p>
      </div>
    </div>
  )
}
