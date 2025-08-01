// components/dashboard/PaymentMethods.tsx
import React from 'react';
import { Plus, CreditCard, Edit, Trash2 } from 'lucide-react';
import type { PaymentMethodsProps } from '../../../types/dashboard';

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ paymentMethods }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Payment Methods</h2>
        <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-sage-900 rounded flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-sage-900">
                    {method.type} ending in {method.last4}
                  </p>
                  <p className="text-sm text-sage-600">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                {method.isDefault && (
                  <span className="bg-gold-400 text-sage-900 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="text-sage-600 hover:text-sage-900 p-2">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-sage-600 hover:text-sage-900 p-2">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;