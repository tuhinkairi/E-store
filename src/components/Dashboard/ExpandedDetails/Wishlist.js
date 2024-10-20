import React from 'react'
import OrderCard from '../Uidash/OrderCard';

export default function Wishlist() {
 

const wishlistItems = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    quantity: 1,
    price: 79.99
  },
  {
    id: 2,
    title: "Smart Fitness Tracker",
    quantity: 1,
    price: 49.95
  },
  {
    id: 3,
    title: "Portable Power Bank",
    quantity: 1,
    price: 29.99
  }
];

return (
  <div>
    <h1 className='text-3xl font-semibold'>Your Wishlist</h1>
    <div className='pt-5'>
      {wishlistItems.map((item) => (
        <OrderCard key={item.id} {...item} />
      ))}
    </div>
  </div>
)}
