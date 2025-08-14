# Google Sign-In Setup Guide

## Overview

This guide explains how to set up Google Sign-In for the Zen Force React Native app.

## Prerequisites

- Google Cloud Console project
- Android app configured in Google Cloud Console
- Valid google-services.json file

## Current Configuration

### Client IDs

- **Android Client ID**: `640380190205-r733gdlkak5ag3qqalp1tn0t0jlmk7pa.apps.googleusercontent.com`
- **Web Client ID**: `640380190205-puskkrjs4jdlemeuld1t32n3vgutc464.apps.googleusercontent.com`

### API Endpoint

- **Google Auth Endpoint**: `https://zen-force-backend.onrender.com/auth/google`
- **Payload Format**:
  ```json
  {
    "idToken": "google_id_token_here",
    "platform": "mobile"
  }
  ```

## Setup Steps

### 1. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select your project
3. Enable Google Sign-In API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials for Android and Web

### 2. Download google-services.json

1. In Google Cloud Console, go to Project Settings
2. Download the `google-services.json` file
3. Replace the placeholder file in `android/app/google-services.json`
4. Make sure the package name matches: `com.zen_force`

### 3. Android Configuration

The following files have been updated:

- `android/build.gradle` - Added Google Services plugin
- `android/app/build.gradle` - Applied Google Services plugin
- `android/app/google-services.json` - Google configuration (needs to be replaced with actual file)

### 4. React Native Configuration

The LoginScreen has been updated with:

- Google Sign-In library integration
- Configuration with web client ID
- Error handling for various sign-in scenarios
- API call to backend with idToken and platform

## Implementation Details

### LoginScreen Changes

- Added Google Sign-In configuration in `useEffect`
- Created `signIn` function to handle Google authentication
- Added `googleAuthMutation` for API calls
- Updated Google Sign-In button to be functional

### API Integration

- Created `googleAuthFn` in `src/api/google/index.ts`
- Sends POST request to `/auth/google` endpoint
- Handles errors and success responses

## Testing

1. Build and run the Android app
2. Navigate to the login screen
3. Tap "Sign in with Google"
4. Complete Google authentication flow
5. Verify the API call is made with correct payload

## Troubleshooting

### Common Issues

1. **"Play services not available"** - Ensure Google Play Services is installed and updated
2. **"Sign in cancelled"** - User cancelled the sign-in process
3. **"No access token received"** - Check Google Cloud Console configuration
4. **API errors** - Verify backend endpoint is accessible and accepts the payload format

### Debug Steps

1. Check console logs for detailed error messages
2. Verify google-services.json is properly configured
3. Ensure all client IDs match between Google Cloud Console and app configuration
4. Test with a valid Google account

## Security Notes

- Never commit the actual google-services.json file to version control
- Use environment variables for sensitive configuration
- Implement proper token validation on the backend
- Consider implementing token refresh logic

## Next Steps

1. Replace placeholder google-services.json with actual file
2. Test the complete authentication flow
3. Implement proper error handling and user feedback
4. Add loading states and proper UI feedback
5. Consider implementing sign-out functionality
