# Stripe React Native Integration Setup Guide

This guide explains how to set up and use the Stripe React Native SDK in the Zen Force app.

## Overview

The app now includes a comprehensive Stripe payment integration with support for:

- **PaymentSheet** (Recommended) - Pre-built payment UI with multiple payment methods
- **Apple Pay** - Native iOS payment method
- **Google Pay** - Native Android payment method
- **Custom Card Form** - Manual card entry for testing

## Current Implementation

### 1. App Configuration (App.tsx)

The app is already configured with StripeProvider:

```typescript
<StripeProvider
  publishableKey="pk_test_51RcoVUHYaQCiZu2x6RYxG4xFIXBPDnilOEkFDJKegL5UUOnBUyOZ9iMZZ0rmeN3odckhpo4ZjoCvEMSdMFvhsNsD00NiDq7gc1"
  merchantIdentifier="merchant.com.zenforce"
  urlScheme="zenforce://">
  {/* App content */}
</StripeProvider>
```

### 2. Payment Components

#### PaymentSheet Component (`src/components/payment/PaymentSheet.tsx`)

- Uses the modern Stripe PaymentSheet approach
- Integrates with backend to create PaymentIntents
- Handles payment processing and error states

#### StripePaymentExample Component (`src/components/payment/StripePaymentExample.tsx`)

- Comprehensive example showing all payment methods
- Includes Apple Pay and Google Pay support
- Custom card form for testing
- Multiple payment options in one component

### 3. Payment Service (`src/services/paymentService.ts`)

- Backend integration methods
- PaymentIntent creation
- Error handling and response processing

## Setup Instructions

### 1. Backend Configuration

You need to set up a backend server that can create PaymentIntents. Update the `API_BASE_URL` in `src/services/paymentService.ts`:

```typescript
private static readonly API_BASE_URL = 'https://your-backend-api.com/api';
```

### 2. Backend Endpoint

Create a `/create-payment-intent` endpoint on your backend:

```javascript
// Example Node.js/Express endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const {amount, currency, customerEmail, metadata} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer_email: customerEmail,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
```

### 3. Environment Configuration

Create environment variables for your Stripe keys:

```bash
# .env file
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_MERCHANT_IDENTIFIER=merchant.com.zenforce
```

### 4. Apple Pay Setup

1. **Apple Developer Account**: Set up Apple Pay in your Apple Developer account
2. **Merchant ID**: Create a merchant ID in the Apple Developer portal
3. **Certificate**: Upload your Apple Pay certificate to Stripe Dashboard
4. **Update App.tsx**: Ensure the merchantIdentifier matches your Apple merchant ID

### 5. Google Pay Setup

1. **Google Pay API**: Set up Google Pay API in Google Cloud Console
2. **Merchant ID**: Configure your Google Pay merchant ID
3. **Update Configuration**: Update the Google Pay configuration in `StripePaymentExample.tsx`

## Usage Examples

### Basic PaymentSheet Usage

```typescript
import {useStripe} from '@stripe/stripe-react-native';

const {initPaymentSheet, presentPaymentSheet} = useStripe();

// Initialize PaymentSheet
const {error} = await initPaymentSheet({
  merchantDisplayName: 'Zen Force',
  paymentIntentClientSecret: clientSecret,
  defaultBillingDetails: {
    email: 'customer@example.com',
  },
});

// Present PaymentSheet
const {error} = await presentPaymentSheet();
```

### Apple Pay Usage

```typescript
import {useApplePay} from '@stripe/stripe-react-native';

const {isApplePaySupported, presentApplePay} = useApplePay();

if (isApplePaySupported) {
  const {error} = await presentApplePay({
    paymentIntentClientSecret: clientSecret,
    confirmParams: {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: 'customer@example.com',
        },
      },
    },
  });
}
```

### Google Pay Usage

```typescript
import {useGooglePay} from '@stripe/stripe-react-native';

const {isGooglePaySupported, presentGooglePay} = useGooglePay();

if (isGooglePaySupported) {
  const {error} = await presentGooglePay({
    paymentIntentClientSecret: clientSecret,
    confirmParams: {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: 'customer@example.com',
        },
      },
    },
  });
}
```

## Testing

### Test Card Numbers

Use these test card numbers for testing:

- **Visa**: 4242 4242 4242 4242
- **Visa (debit)**: 4000 0566 5566 5556
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005

### Test Scenarios

1. **Successful Payment**: Use any test card with valid future expiry
2. **Declined Payment**: Use 4000 0000 0000 0002
3. **Insufficient Funds**: Use 4000 0000 0000 9995
4. **3D Secure**: Use 4000 0025 0000 3155

## Production Checklist

Before going to production:

- [ ] Update publishable key to production key
- [ ] Set up production backend endpoint
- [ ] Configure Apple Pay for production
- [ ] Configure Google Pay for production
- [ ] Set `testEnv: false` in Google Pay configuration
- [ ] Test all payment methods thoroughly
- [ ] Set up webhook endpoints for payment status updates
- [ ] Implement proper error handling and logging
- [ ] Add analytics for payment events

## Troubleshooting

### Common Issues

1. **"Payment sheet is not ready"**

   - Check that PaymentIntent was created successfully
   - Verify client secret is valid
   - Ensure backend endpoint is working

2. **Apple Pay not available**

   - Verify merchant identifier is correct
   - Check Apple Pay certificate is uploaded to Stripe
   - Ensure running on physical device (not simulator)

3. **Google Pay not available**

   - Check Google Pay API is enabled
   - Verify merchant configuration
   - Ensure running on Android device with Google Pay

4. **Payment fails**
   - Check test card numbers
   - Verify amount is in cents
   - Check backend logs for errors

### Debug Mode

Enable debug logging by adding to your app:

```typescript
import {setReturnUrl} from '@stripe/stripe-react-native';

// Enable debug mode
setReturnUrl('zenforce://');
```

## Security Notes

- Never expose your Stripe secret key in the mobile app
- Always create PaymentIntents on your backend
- Use webhooks to handle payment status updates
- Implement proper error handling and user feedback
- Follow PCI compliance guidelines

## Additional Resources

- [Stripe React Native Documentation](https://stripe.com/docs/stripe-react-native)
- [PaymentSheet Guide](https://stripe.com/docs/payments/accept-a-payment?platform=react-native&ui=payment-sheet)
- [Apple Pay Integration](https://stripe.com/docs/apple-pay)
- [Google Pay Integration](https://stripe.com/docs/google-pay)
- [Testing Guide](https://stripe.com/docs/testing)
