import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Welcome back, User!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2> 
            {/* Add recent orders list here */}
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            {/* Add product recommendations here */}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
            {/* Add account summary here */}
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/orders" className="text-blue-600 dark:text-blue-400 hover:underline">Your Orders</Link></li>
              <li><Link to="/wishlist" className="text-blue-600 dark:text-blue-400 hover:underline">Wishlist</Link></li>
              <li><Link to="/profile" className="text-blue-600 dark:text-blue-400 hover:underline">Edit Profile</Link></li>
              <li><Link to="/addresses" className="text-blue-600 dark:text-blue-400 hover:underline">Manage Addresses</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
