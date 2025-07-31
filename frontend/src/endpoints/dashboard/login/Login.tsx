import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup-choice'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  const handleOAuthSignup = (provider) => {
    // Handle OAuth signup and redirect to onboarding
    console.log(`${provider} signup - redirect to onboarding`);
  };

  const handleEmailSignup = () => {
    // Redirect to onboarding page
    navigate("/onboarding")
    console.log('Email signup - redirect to onboarding');
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gold-400 rounded-full opacity-20 animate-float`}
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${4 + i * 0.3}s`
          }}
        />
      ))}
    </div>
  );

  const LoginView = () => (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative">
      <FloatingParticles />
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-800 rounded-full mb-6 relative">
            <span className="text-3xl font-bold text-cream">E</span>
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-20"></div>
          </div>
          <h1 className="text-3xl font-light text-sage-800 mb-2 tracking-wider">ELYSIAN</h1>
          <p className="text-cream-70 text-sm">Welcome back to timeless elegance</p>
        </div>

        {/* Login Form */}
        <div className="bg-sage-900-95 backdrop-blur-sm rounded-2xl p-8 border border-cream-20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-sage-700 text-center mb-8">Sign In</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-cream-80 text-sm mb-3 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cream-60 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-sage-800 border border-cream-30 rounded-xl px-12 py-4 text-cream placeholder-cream-60 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:ring-opacity-30 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-80 text-sm mb-3 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-sage-800 border border-cream-30 rounded-xl px-4 py-4 pr-12 text-cream placeholder-cream-60 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:ring-opacity-30 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cream-60 hover:text-cream transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-cream-70 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="mr-3 w-4 h-4 accent-gold-500" 
                />
                <span className="text-sm">Remember me</span>
              </label>
              <button type="button" className="text-gold-500 hover:text-gold-400 transition-colors text-sm font-medium">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sage-700 to-sage-600 hover:from-sage-600 hover:to-sage-500 text-cream py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-sage-700 px-6 text-cream">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-cream-70 text-sm mb-4">
              Don't have an account?
            </p>
            <button
              onClick={() => setCurrentView('signup-choice')}
              className="text-gold-500 hover:text-gold-400 transition-colors font-medium text-lg"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SignUpChoiceView = () => (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative">
      <FloatingParticles />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-800 rounded-full mb-6 relative">
            <span className="text-3xl font-bold text-cream">E</span>
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-20"></div>
          </div>
          <h1 className="text-3xl font-light text-sage-800 mb-2 tracking-wider">ELYSIAN</h1>
          <p className="text-cream-70 text-sm">Join our community of style enthusiasts</p>
        </div>

        <div className="bg-sage-900-95 backdrop-blur-sm rounded-2xl p-8 border border-cream-20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-sage-700 text-center mb-8">Create Account</h2>
          
          <div className="space-y-4">
            {/* OAuth Options */}
            <button 
              onClick={() => handleOAuthSignup('Google')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button 
              onClick={() => handleOAuthSignup('Apple')}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Continue with Apple
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream-30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-sage-700 px-6 text-cream-60 text-cream text-sm">or</span>
              </div>
            </div>

            {/* Email Signup Option */}
            <button
              onClick={handleEmailSignup}
              className="w-full bg-gradient-to-r from-sage-700 to-sage-600 hover:from-sage-600 hover:to-sage-500 text-cream py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
            >
              <Mail className="mr-3 w-5 h-5" />
              Sign up with Email
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentView('login')}
              className="flex items-center text-cream-70 hover:text-gold-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'signup-choice') return <SignUpChoiceView />;
  return <LoginView />;
};

export default LoginPage;