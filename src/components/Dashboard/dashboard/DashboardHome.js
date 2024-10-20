import React from 'react'

export default function DashboardHome() {
  return (
    <div>
    <h1 className='text-3xl font-semibold'>Welcome to Dashboard</h1>
    <div className="dashboard-summary">
      <div className="summary-item">
        <h2>Total Orders</h2>
        <p>5</p> {/* Replace with dynamic data as needed */}
      </div>
      <div className="summary-item">
        <h2>Total Wishlist Items</h2>
        <p>3</p> {/* Replace with dynamic data as needed */}
      </div>
      <div className="summary-item">
        <h2>Total Payments</h2>
        <p>2</p> {/* Replace with dynamic data as needed */}
      </div>
      <div className="summary-item">
        <h2>Profile Completion</h2>
        <p>80%</p> {/* Replace with dynamic data as needed */}
      </div>
    </div>
    <style jsx>{`
      .dashboard-summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 20px;
      }
      .summary-item {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        text-align: center;
      }
    `}</style>
    </div>
  )
}
