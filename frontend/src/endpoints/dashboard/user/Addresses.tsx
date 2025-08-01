// components/dashboard/Addresses.tsx
import React from 'react';
import { Plus, Edit } from 'lucide-react';
import type { AddressesProps } from '../../../types/dashboard';

const Addresses: React.FC<AddressesProps> = ({ addresses }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Shipping Addresses</h2>
        <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sage-900">{address.type}</h3>
                {address.isDefault && (
                  <span className="bg-gold-400 text-sage-900 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <button className="text-sage-600 hover:text-sage-900">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sage-600 text-sm space-y-1">
              <p className="font-medium text-sage-900">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;