import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function ProfileInfo(params) {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/Dashboard")} className='flex items-center text-sm gap-5 border p-2 shadow cursor-pointer'>

      <img className='w-16 h-16 rounded-full border-2 border-gray-300'  src={""} alt="" />
      <div>
        <h1>User Name</h1>
        <p>user@gmail.com</p>
      </div>
    </div>
  )
}
