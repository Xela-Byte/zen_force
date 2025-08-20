#!/bin/bash

echo "🔑 Getting SHA1 Fingerprint for Google Sign-In Setup"
echo "=================================================="

# Check if debug keystore exists
KEYSTORE_PATH="android/app/debug.keystore"

if [ -f "$KEYSTORE_PATH" ]; then
    echo "✅ Debug keystore found at: $KEYSTORE_PATH"
    echo ""
    echo "SHA1 Fingerprint:"
    echo "-----------------"
    keytool -list -v -keystore "$KEYSTORE_PATH" -alias androiddebugkey -storepass android -keypass android | grep SHA1
    echo ""
    echo "SHA256 Fingerprint:"
    echo "-------------------"
    keytool -list -v -keystore "$KEYSTORE_PATH" -alias androiddebugkey -storepass android -keypass android | grep SHA256
    echo ""
    echo "📋 Copy the SHA1 fingerprint and use it in your Google Cloud Console:"
    echo "   1. Go to Google Cloud Console"
    echo "   2. Select your project"
    echo "   3. Go to APIs & Services > Credentials"
    echo "   4. Edit your Android OAuth 2.0 client"
    echo "   5. Add the SHA1 fingerprint above"
    echo "   6. Download the updated google-services.json"
    echo "   7. Replace android/app/google-services.json with the downloaded file"
else
    echo "❌ Debug keystore not found at: $KEYSTORE_PATH"
    echo "Please make sure you're running this from the project root directory."
fi
