// components/dashboard/Addresses.tsx
import { Plus, Edit } from 'lucide-react';
import type { UserProps } from '../../../types/user';

export default function Addresses({address}:{address:UserProps | null}){
  return (
    <div className="space-y-6 capitalize">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Shipping Addresses</h2>
        <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Change Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {address ?
          <div key={address.addressType} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sage-900">{address.firstName} {address.lastName}</h3>
              </div>
              <button className="text-sage-600 hover:text-sage-900">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sage-600 text-sm space-y-1">
              <p className="font-medium text-sage-900">{address.state}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>
          </div>
          :
          <h3 className="font-medium text-sage-900">Opps No Address Present</h3>
          }
      </div>
    </div>
  );
};
