import { Check, Gift, Heart, Star } from "lucide-react";

const CompleteStep = () => (
  <div className="text-center space-y-8">
    <div className="space-y-4">
      <div className="w-20 h-20 bg-gradient-to-r from-sage-900 to-sage-700 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-10 w-10 text-cream" />
      </div>
      <h1 className="text-4xl font-light text-sage-900">Welcome to Elysian!</h1>
      <p className="text-lg text-sage-600 max-w-md mx-auto">
        Your account has been created successfully. We're excited to help you discover your perfect style.
      </p>
    </div>

    <div className="bg-gradient-to-r from-sage-900 to-sage-700 rounded-lg p-6 text-cream max-w-md mx-auto">
      <h3 className="text-xl font-medium mb-4">What's Next?</h3>
      <div className="space-y-3 text-left">
        <div className="flex items-center space-x-3">
          <Gift className="h-5 w-5 text-gold-400" />
          <span>Enjoy 15% off your first order with code WELCOME15</span>
        </div>
        <div className="flex items-center space-x-3">
          <Star className="h-5 w-5 text-gold-400" />
          <span>Browse our curated collections just for you</span>
        </div>
        <div className="flex items-center space-x-3">
          <Heart className="h-5 w-5 text-gold-400" />
          <span>Start building your wishlist</span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        <button className="bg-sage-900 text-cream px-6 py-3 rounded-lg hover:bg-sage-800 transition-colors">
          Start Shopping
        </button>
        <button className="border border-sage-900 text-sage-900 px-6 py-3 rounded-lg hover:bg-sage-50 transition-colors">
          Complete Profile
        </button>
      </div>

      <p className="text-sm text-sage-600">
        Need help? Contact our style consultants at{' '}
        <a href="mailto:hello@elysian.com" className="text-sage-900 hover:underline">
          hello@elysian.com
        </a>
      </p>
    </div>
  </div>
);
export default CompleteStep;