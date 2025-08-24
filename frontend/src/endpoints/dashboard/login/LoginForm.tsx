import { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mail } from 'lucide-react';
import LogoHeader from './LogoHeader';
import LoginEndpoint from '../../../axios/auth/login';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import LoadingScreen from '../../../components/fallback/LoadingScreen';
import { setLoading } from '../../../store/features/GlobalSlice';
import getWishlist from '../../../axios/user/getWishlist';
import getUserOrders from '../../../axios/order/getOrders';
import { setUserAuth } from '../../../store/features/UserSlice';

const LoginForm = ({ switchToSignup }: { switchToSignup: () => void }) => {
  const navigate = useNavigate()
  const isLoading = useAppSelector((state) => state.loading.isLoading)
  const token = useAppSelector((state) => state.user?.token ? state.user?.token : state.user)?.toString()

  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false, token: token });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: boolean | string) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleLogin = useCallback(async () => {
    
    try {
      dispatch(setLoading(true));
      const [loginData] = await Promise.allSettled([LoginEndpoint(formData)]);

      if (loginData.status === "fulfilled" && loginData.value) {
        // Create a new user object instead of mutating
        const baseUser = {
          ...loginData.value.user,
          token: loginData.value.user,
          isLoggedIn: false
        };
        dispatch(setUserAuth({ ...baseUser, token: loginData.value?.token }));

        // Fetch additional data in parallel
        const [wishlistResult, ordersResult] = await Promise.allSettled([
          getWishlist(),
          getUserOrders()
        ]);

        // Create final user object with all data
        const finalUser = {
          ...baseUser,
          ...(wishlistResult.status === 'fulfilled' && wishlistResult.value ? { wishlist: wishlistResult.value } : {}),
          ...(ordersResult.status === 'fulfilled' && ordersResult.value ? { orders: ordersResult.value } : {})
        };
        if (ordersResult.status === 'fulfilled') {
          dispatch(setUserAuth({ ...finalUser, token: loginData.value?.token, isLoggedIn: true }));
          navigate("/dashboard/user");
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [formData, dispatch, navigate]);
  useEffect(()=>// console.log(isLoading),[isLoading])
  if (isLoading) {
    return <LoadingScreen fullScreen size='large' />
  }
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cream-60 hover:text-gold-600"
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
