import { ArrowRight, ChevronLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoHeader from './LogoHeader';

interface SignupChoiceProps {
  goBack: () => void;
}

const SignupChoice = ({ goBack }: SignupChoiceProps) => {
  const navigate = useNavigate();

  const handleOAuth = (provider: string) => {
    // console.log(`${provider} signup - redirect`);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-around p-4 relative">
      <div className='max-w-md w-full'>
        <LogoHeader subtitle="Join our community of style enthusiasts" />
      </div>
      <div className="w-full max-w-md">

        <div className="bg-sage-900-95 backdrop-blur-sm rounded-2xl p-8 border border-cream-20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-sage-700 text-center mb-8">Create Account</h2>

          <div className="space-y-4">
            {/* Google */}
            <button
              onClick={() => handleOAuth('Google')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 py-4 rounded-xl font-medium flex items-center justify-center shadow-lg"
            >
              <span className="mr-3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII=" alt="google-logo" className='w-7'/></span> Continue with Google
            </button>

            {/* Apple */}
            <button
              onClick={() => handleOAuth('Apple')}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-medium flex items-center justify-center shadow-lg"
            >
              <span className="mr-3"><img src="/src/assets/apple.png" className='invert w-7' alt="apple logo" /></span> Continue with Apple
            </button>

            {/* Divider */}
            <div className="my-8 relative flex justify-center items-center">
              <div className="w-full border-t border-cream-30"></div>
              <span className="absolute bg-sage-700 px-6 text-cream text-sm">or</span>
            </div>

            {/* Email Signup */}
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full bg-gradient-to-r from-sage-700 to-sage-600 text-cream py-4 rounded-xl font-medium flex items-center justify-center group"
            >
              <Mail className="mr-3" /> Sign up with Email <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Back */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={goBack} className="flex items-center text-cream-70 hover:text-gold-500 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupChoice;
