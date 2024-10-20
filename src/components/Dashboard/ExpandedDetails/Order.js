import React, { useRef } from 'react'
import OrderCard from '../Uidash/OrderCard'
import { FaSearch } from 'react-icons/fa'

export default function Order() {
  const searchRef = useRef()
  // demo data
  const data = [
    {
      "id": 1,
      "title": "Wireless Bluetooth Headphones",
      "quantity": 2,
      "price": 79.99
    },
    {
      "id": 2,
      "title": "Smart Fitness Tracker",
      "quantity": 1,
      "price": 49.95
    },
    {
      "id": 3,
      "title": "Portable Power Bank",
      "quantity": 3,
      "price": 29.99
    },
    {
      "id": 4,
      "title": "4K Ultra HD Smart TV",
      "quantity": 1,
      "price": 599.99
    },
    {
      "id": 5,
      "title": "Stainless Steel Water Bottle",
      "quantity": 4,
      "price": 19.99
    }
  ]
  // search logic
  const handelSearch = ()=>{
    searchRef.current.value=''
    console.log('search')
  } 

  return (
    <div>
            <h1 className="text-3xl font-semibold">Your Orders</h1>
            <div className='flex justify-center items-center gap-2 mt-5 '>
              <input ref={searchRef} type="text" id="Search" placeholder='Search' className='border shadow p-2 w-1/2' />
              <button onClick={handelSearch}><FaSearch/></button>
            </div>
            <div className='pt-5'>

            {data.map((item)=><OrderCard key={item.id} {...item}/>)}
            </div>
    </div>
  )
}
