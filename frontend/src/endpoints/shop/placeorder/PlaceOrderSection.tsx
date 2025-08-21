import React, { useState } from 'react';
import { ShoppingBag, MapPin, CreditCard, Truck, Shield, ChevronRight, Minus, Plus, X } from 'lucide-react';

const PlaceOrderSection = () => {
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Premium Cotton Polo Shirt",
      category: "Polo",
      price: 229.99,
      originalPrice: 279.99,
      quantity: 2,
      color: "Navy",
      size: "M",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Heritage Cashmere Coat",
      category: "Signature",
      price: 485.00,
      quantity: 1,
      color: "Charcoal",
      size: "L",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Merino Wool Sweater",
      category: "Luxury",
      price: 325.00,
      quantity: 1,
      color: "Cream",
      size: "M",
      image: "/api/placeholder/80/80"
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: 'same'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 300 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const updateQuantity = (id:string|number, change:number) => {
    setOrderItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string | number) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'elysian10') {
      setPromoApplied(true);
    }
  };

  const handleShippingSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const formatPrice = (price:number) => `$${price.toFixed(2)}`;

  const OrderSummary = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-sage-200 p-6 sticky top-8">
      <h3 className="text-xl font-semibold text-sage-900 mb-6 flex items-center">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 p-4 bg-sage-50 rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sage-900 text-sm">{item.name}</h4>
              <p className="text-sage-600 text-xs">{item.color} • Size {item.size}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center hover:bg-sage-300 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center hover:bg-sage-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sage-500 hover:text-sage-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sage-900">{formatPrice(item.price)}</p>
              {item.originalPrice && (
                <p className="text-xs text-sage-500 line-through">{formatPrice(item.originalPrice)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-6 p-4 bg-cream rounded-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
          <button
            onClick={applyPromoCode}
            disabled={promoApplied}
            className="px-4 py-2 bg-sage-800 text-cream text-sm rounded-lg hover:bg-sage-900 transition-colors disabled:bg-sage-400"
          >
            Apply
          </button>
        </div>
        {promoApplied && (
          <p className="text-green-600 text-xs mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Promo code applied! 10% off
          </p>
        )}
      </div>

      {/* Order Totals */}
      <div className="space-y-3 border-t border-sage-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-sage-600">Subtotal</span>
          <span className="text-sage-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-sage-600">Shipping</span>
          <span className="text-sage-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-sage-600">Tax</span>
          <span className="text-sage-900">{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg border-t border-sage-200 pt-3">
          <span className="text-sage-900">Total</span>
          <span className="text-sage-900">{formatPrice(total)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-xs flex items-center">
            <Truck className="w-4 h-4 mr-2" />
            Free shipping on orders over $300
          </p>
        </div>
      )}
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[
        { step: 1, label: 'Shipping', icon: MapPin },
        { step: 2, label: 'Payment', icon: CreditCard },
        { step: 3, label: 'Review', icon: Shield }
      ].map(({ step, label, icon: Icon }) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= step 
              ? 'bg-gold-500 text-white' 
              : 'bg-sage-200 text-sage-600'
          }`}>
            {currentStep > step ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <Icon className="w-5 h-5" />
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step ? 'text-sage-900' : 'text-sage-500'
          }`}>
            {label}
          </span>
          {step < 3 && <ChevronRight className="w-4 h-4 text-sage-400 ml-4" />}
        </div>
      ))}
    </div>
  );

  const ShippingForm = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-sage-200 p-6">
      <h3 className="text-xl font-semibold text-sage-900 mb-6">Shipping Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">First Name</label>
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">Last Name</label>
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-700 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-700 mb-2">Phone Number</label>
          <input
            type="tel"
            required
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-700 mb-2">Street Address</label>
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">City</label>
            <input
              type="text"
              required
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">State</label>
            <select
              required
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              {/* Add more states as needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">ZIP Code</label>
            <input
              type="text"
              required
              value={shippingInfo.zipCode}
              onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleShippingSubmit}
          className="w-full bg-sage-800 text-cream py-4 rounded-lg font-semibold hover:bg-sage-900 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const PaymentForm = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-sage-200 p-6">
      <h3 className="text-xl font-semibold text-sage-900 mb-6">Payment Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-sage-700 mb-2">Card Number</label>
          <input
            type="text"
            required
            placeholder="1234 5678 9012 3456"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">Expiry Date</label>
            <input
              type="text"
              required
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">CVV</label>
            <input
              type="text"
              required
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-700 mb-2">Name on Card</label>
          <input
            type="text"
            required
            value={paymentInfo.nameOnCard}
            onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex-1 border border-sage-300 text-sage-700 py-4 rounded-lg font-semibold hover:bg-sage-50 transition-colors"
          >
            Back to Shipping
          </button>
          <button
            type="button"
            onClick={handlePaymentSubmit}
            className="flex-1 bg-sage-800 text-cream py-4 rounded-lg font-semibold hover:bg-sage-900 transition-colors"
          >
            Review Order
          </button>
        </div>
      </div>
    </div>
  );

  const OrderReview = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-sage-200 p-6">
      <h3 className="text-xl font-semibold text-sage-900 mb-6">Review Your Order</h3>
      
      <div className="space-y-6">
        {/* Shipping Address */}
        <div className="p-4 bg-sage-50 rounded-lg">
          <h4 className="font-semibold text-sage-900 mb-2">Shipping Address</h4>
          <p className="text-sage-700 text-sm">
            {shippingInfo.firstName} {shippingInfo.lastName}<br />
            {shippingInfo.address}<br />
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
            {shippingInfo.phone}
          </p>
        </div>

        {/* Payment Method */}
        <div className="p-4 bg-sage-50 rounded-lg">
          <h4 className="font-semibold text-sage-900 mb-2">Payment Method</h4>
          <p className="text-sage-700 text-sm">
            **** **** **** {paymentInfo.cardNumber.slice(-4)}<br />
            {paymentInfo.nameOnCard}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex-1 border border-sage-300 text-sage-700 py-4 rounded-lg font-semibold hover:bg-sage-50 transition-colors"
          >
            Back to Payment
          </button>
          <button
            className="flex-1 bg-gold-500 text-white py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
          >
            Place Order • {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Complete Your Order</h1>
          <p className="text-sage-600 max-w-2xl mx-auto">
            Experience timeless elegance with our carefully curated collection. 
            Your sophisticated style journey continues here.
          </p>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <ShippingForm />}
            {currentStep === 2 && <PaymentForm />}
            {currentStep === 3 && <OrderReview />}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <Shield className="w-6 h-6 text-gold-500 mr-3" />
            <span className="text-sage-700 text-sm font-medium">Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <Truck className="w-6 h-6 text-gold-500 mr-3" />
            <span className="text-sage-700 text-sm font-medium">Free Returns</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <ShoppingBag className="w-6 h-6 text-gold-500 mr-3" />
            <span className="text-sage-700 text-sm font-medium">Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderSection;