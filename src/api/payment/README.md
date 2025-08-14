# Payment API Integration

This directory contains the payment API functions for the Zen Force app.

## Files

- `index.ts` - Contains the `initiateSubscriptionFn` function for creating payment intents

## Usage

### initiateSubscriptionFn

This function calls the backend to create a payment intent for subscription plans.

**Parameters:**

- `planType`: 'basic' | 'premium'
  - 'basic' corresponds to the $9.99 plan
  - 'premium' corresponds to the $19.99 plan

**Returns:**

- `clientSecret`: string - The Stripe client secret for the payment intent

**Example:**

```typescript
import {initiateSubscriptionFn} from '@/api/payment';

const result = await initiateSubscriptionFn({
  planType: 'basic',
});

console.log('Client secret:', result.clientSecret);
```

## Backend Integration

The function calls the backend endpoint:

- **URL**: `https://zen-force-backend.onrender.com/subscriptions/initiate`
- **Method**: POST
- **Headers**: Authorization Bearer token (automatically added by ApiClient)
- **Body**: `{ "planType": "basic" | "premium" }`

**Response:**

```json
{
  "clientSecret": "pi_3Rv0ntHYaQCiZu2x1lVXWzrX_secret_qt7GGAvYI5nnfRgmdPPXMRvzz"
}
```

## Error Handling

The function includes comprehensive error handling:

- Network errors
- Server errors (4xx, 5xx)
- Invalid responses
- Authentication errors

All errors are logged to console and re-thrown with descriptive messages.

## Integration with React Query

Use the `useInitiateSubscriptionMutation` hook for React components:

```typescript
import { useInitiateSubscriptionMutation } from '@/hooks/mutations/usePaymentMutation';

const MyComponent = () => {
  const mutation = useInitiateSubscriptionMutation();

  const handlePayment = async () => {
    try {
      const result = await mutation.mutateAsync({
        planType: 'basic'
      });

      // Use result.clientSecret with Stripe PaymentSheet
      console.log('Payment intent created:', result.clientSecret);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Processing...' : 'Pay Now'}
    </button>
  );
};
```
