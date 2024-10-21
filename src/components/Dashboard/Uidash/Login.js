import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    // Logic for Google login goes here
    console.log("Logging in with Google...");
    // After successful login, navigate to the dashboard or desired page
    navigate('/Dashboard');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Logic for email/password login goes here
    console.log("Logging in with email and password...");
    // After successful login, navigate to the dashboard or desired page
    navigate('/Dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform ">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Welcome Back</h1>
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <Link to="/forgetpassword" className="text-purple-600 hover:underline">Forgot password?</Link>
          </div>
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            Login with Email
          </button>
        </form>
        <div className="mt-8 flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 font-medium">or</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <button 
          onClick={handleGoogleLogin} 
          className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
        >
          <FaGoogle className="mr-2 text-red-600" />
          Login with Google
        </button>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/authentication/register" className="font-medium text-purple-600 hover:underline">Sign up</Link> 
        </p>
      </div>
    </div>
  );
}
