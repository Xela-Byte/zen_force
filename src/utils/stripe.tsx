import {
  initStripe,
  StripeProvider as StripeProviderBase,
} from '@stripe/stripe-react-native';
import React from 'react';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51RcoVUHYaQCiZu2x6RYxG4xFIXBPDnilOEkFDJKegL5UUOnBUyOZ9iMZZ0rmeN3odckhpo4ZjoCvEMSdMFvhsNsD00NiDq7gc1';

export const initializeStripe = async () => {
  try {
    await initStripe({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      merchantIdentifier: 'merchant.com.zenforce.app', // Replace with your merchant identifier
    });
  } catch (error) {
    console.error('Error initializing Stripe:', error);
  }
};

interface StripeProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const StripeProvider: React.FC<StripeProviderProps> = ({children}) => {
  return (
    <StripeProviderBase
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.zenforce.app">
      {children}
    </StripeProviderBase>
  );
};
