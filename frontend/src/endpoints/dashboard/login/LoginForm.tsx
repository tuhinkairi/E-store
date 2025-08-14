import { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mail } from 'lucide-react';
import LogoHeader from './LogoHeader';
import LoginEndpoint from '../../../axios/auth/login';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ switchToSignup }: { switchToSignup: () => void }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(localStorage.getItem('elegance_session'));
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false, token: token });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: boolean | string) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleLogin = useCallback(() => {
    
    LoginEndpoint(formData).then(data => {
      localStorage.setItem('elegance_session', formData.rememberMe ? data?.token ?? "": "") //only save token if remember me have
      setToken(data?.token || null)
      console.log(data)
    }).catch(err=>console.log(err))
    console.log('Login attempt:', formData);
  }, [formData]);

  useEffect(()=>{
    if (token) {
      navigate("/")
    }
  },[token, navigate])
  return (
    <div className="min-h-screen bg-cream grid grid-cols-2 items-center justify-center p-4 relative">
      <div className=''>
        <LogoHeader subtitle="Join our community of style enthusiasts" />
      </div>
      <div className="mx-auto w-full max-w-md">

        <div className="bg-sage-900-95 backdrop-blur-sm rounded-2xl p-8 border border-cream-20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-sage-700 text-center mb-8">Sign In</h2>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-cream-80 text-sm mb-3 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cream-60 w-5 h-5" />
                <input
                  type="email"
                  className="w-full bg-sage-800 border border-cream-30 rounded-xl px-12 py-4 text-cream placeholder-cream-60 focus:outline-none focus:border-gold-500 focus:ring-2"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-cream-80 text-sm mb-3 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-sage-800 border border-cream-30 rounded-xl px-4 py-4 pr-12 text-cream placeholder-cream-60 focus:outline-none focus:border-gold-500 focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cream-60 hover:text-cream"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-cream-70">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={e => handleChange('rememberMe', e.target.checked)}
                  className="mr-3 w-4 h-4 accent-gold-500"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <button className="text-gold-500 hover:text-gold-400 text-sm font-medium">Forgot password?</button>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sage-700 to-sage-600 text-cream py-4 rounded-xl font-medium flex items-center justify-center group"
            >
              Sign In
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 relative flex justify-center items-center">
            <div className="w-full border-t border-cream-30"></div>
            <span className="absolute bg-sage-700 px-6 text-cream text-sm">or</span>
          </div>

          <div className="text-center">
            <p className="text-cream-70 text-sm mb-4">Don't have an account?</p>
            <button onClick={switchToSignup} className="text-gold-500 hover:text-gold-400 font-medium text-lg">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
