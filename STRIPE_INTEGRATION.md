# Stripe Integration Documentation

This document outlines the Stripe React Native integration implemented in the Zen Force app.

## Overview

The Stripe integration has been implemented to handle payments for subscription plans in the app. The integration includes:

- Stripe React Native SDK
- Payment sheet component for card input
- Payment processing service
- Integration with the existing plan selection flow

## Files Added/Modified

### New Files

1. `src/utils/stripe.ts` - Stripe configuration and provider
2. `src/services/paymentService.ts` - Payment processing service
3. `src/components/payment/PaymentSheet.tsx` - Payment UI component
4. `STRIPE_INTEGRATION.md` - This documentation

### Modified Files

1. `App.tsx` - Added StripeProvider wrapper
2. `src/screens/inApp/profile/ChoosePlanScreen.tsx` - Integrated payment functionality
3. `package.json` - Added @stripe/stripe-react-native dependency

## Setup Instructions

### 1. Install Dependencies

```bash
sudo yarn add @stripe/stripe-react-native
```

### 2. iOS Setup (if needed)

```bash
cd ios && pod install
```

### 3. Configure Stripe Keys

Update the `STRIPE_PUBLISHABLE_KEY` in `src/utils/stripe.ts`:

```typescript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_publishable_key_here';
```

### 4. Update Merchant Identifier

Update the merchant identifier in `src/utils/stripe.ts`:

```typescript
merchantIdentifier: 'merchant.com.yourcompany.yourapp';
```

## Usage

### Payment Flow

1. User selects a plan in `ChoosePlanScreen`
2. User taps "Pay Now" button
3. Payment modal opens with `PaymentSheet` component
4. User enters card details
5. Payment is processed through Stripe
6. Success/error feedback is shown to user

### PaymentSheet Component

The `PaymentSheet` component provides:

- Card input field with validation
- Payment processing with loading states
- Error handling and user feedback
- Cancel and payment buttons

### PaymentService

The `PaymentService` class provides:

- Payment method creation
- Payment confirmation
- Payment processing utilities

## Testing

### Test Card Numbers

Use these test card numbers for testing:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`

### Test Environment

The integration is configured for test mode by default. For production:

1. Replace test publishable key with live key
2. Update merchant identifier
3. Test thoroughly in production environment

## Backend Integration

The current implementation includes mock payment processing. For production use:

1. Create a backend API to create PaymentIntents
2. Update `PaymentService.processPayment()` to call your backend
3. Handle webhook events for payment status updates
4. Implement proper error handling and retry logic

## Security Considerations

1. Never expose secret keys in client-side code
2. Always use publishable keys in the app
3. Implement proper server-side validation
4. Use HTTPS for all API calls
5. Follow Stripe's security best practices

## Troubleshooting

### Common Issues

1. **Payment fails**: Check Stripe dashboard for error details
2. **Card field not showing**: Ensure StripeProvider is properly configured
3. **iOS build issues**: Run `pod install` in ios directory
4. **Android build issues**: Clean and rebuild project

### Debug Mode

Enable debug logging by adding to `src/utils/stripe.ts`:

```typescript
await initStripe({
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  merchantIdentifier: 'merchant.com.zenforce.app',
  enableDebugLogs: true, // Add this line
});
```

## Support

For issues related to:

- Stripe SDK: Check [Stripe React Native documentation](https://stripe.com/docs/stripe-react-native)
- App integration: Check this documentation and code comments
- Payment processing: Check Stripe dashboard and logs
