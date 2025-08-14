import { Shield } from "lucide-react";
import CheckboxInput from "./CheckboxInput";
import type { NotificationsStepProps, UserProps } from "../../../../types/user";

const NotificationsStep = ({ formData, onChange }:NotificationsStepProps) => {
  const notificationOptions = [
    {
      key: 'orderUpdates',
      label: 'Order Updates',
      description: 'Get notified about your order status and shipping updates'
    },
    {
      key: 'promotionalEmails',
      label: 'Promotional Emails',
      description: 'Receive exclusive offers, sales, and new arrival notifications'
    },
    {
      key: 'styleRecommendations',
      label: 'Style Recommendations',
      description: 'Get personalized style tips and curated product suggestions'
    },
    {
      key: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive text updates for urgent order information'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">Stay Connected</h2>
        <p className="text-sage-600">Choose how you'd like to hear from us</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <CheckboxInput
              key={option.key}
              checked={formData[option.key as keyof UserProps] as boolean}
              onChange={(value) => onChange(option.key, value)}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>

        <div className="bg-sage-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-sage-600 mt-0.5" />
            <div>
              <p className="text-sm text-sage-900 font-medium">Privacy Promise</p>
              <p className="text-xs text-sage-600 mt-1">
                We respect your privacy. You can change these preferences anytime in your account settings, and we'll never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationsStep;