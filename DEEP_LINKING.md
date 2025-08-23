# Deep Linking Setup for Zen Force

## URL Scheme Configuration

The app has been configured with the URL scheme: `zenforce://`

## Available Deep Links

### 1. Choose Plan Screen

- **Route Name**: `choose-plan`
- **URL Pattern**: `zenforce://choose-plan`
- **With Plan Data**: `zenforce://choose-plan?plan={"title":"Basic Plan","price":"$9.99/month","description":"Essential features"}`

## How to Use

### From External Apps

```javascript
// Open the choose plan screen
Linking.openURL('zenforce://choose-plan');

// Open with specific plan data
const planData = {
  title: 'Premium Plan',
  price: '$19.99/month',
  description: 'Advanced features for serious couples',
};

const url = `zenforce://choose-plan?plan=${encodeURIComponent(JSON.stringify(planData))}`;
Linking.openURL(url);
```

### From Within the App

```typescript
import {
  openChoosePlanScreen,
  openChoosePlanScreenWithPlan,
} from '@/utils/deepLinking';

// Open generic choose plan screen
openChoosePlanScreen();

// Open with specific plan
openChoosePlanScreenWithPlan(
  'Basic Plan',
  '$9.99/month',
  'Essential features for couples',
);
```

## Testing

1. **iOS Simulator**: Use Safari and navigate to `zenforce://choose-plan`
2. **Android Emulator**: Use adb command: `adb shell am start -W -a android.intent.action.VIEW -d "zenforce://choose-plan" com.zenforce.app`
3. **Physical Device**: Use any app that can open URLs and enter `zenforce://choose-plan`

## Navigation Structure

```
BottomTabNavigator
└── ProfileStack
    └── ChoosePlanScreen (route: 'choose-plan')
```

## Configuration Files Modified

- `ios/zen_force/Info.plist` - Added URL scheme configuration
- `android/app/src/main/AndroidManifest.xml` - Added intent filter
- `src/navigation/Navigator.tsx` - Added linking configuration
- `src/screens/inApp/profile/ChoosePlanScreen.tsx` - Updated to handle deep link parameters
- `src/utils/deepLinking.ts` - Created utility functions

## Notes

- The URL scheme `zenforce` is used for both iOS and Android
- Plan data is passed as URL parameters and parsed in the ChoosePlanScreen
- The screen gracefully handles missing or malformed plan data
- Stripe integration uses the same URL scheme for 3D Secure redirects
