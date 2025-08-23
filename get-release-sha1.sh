#!/bin/bash

# Script to get SHA-1 fingerprint from the release keystore
# Usage: ./get-sha1.sh

cd "$(dirname "$0")/android/app"

echo "Getting SHA-1 fingerprint from release keystore..."
echo "=============================================="

keytool -list -v -keystore zen_force-release-key.keystore -alias zen_force-key-alias -storepass zenforce123 | grep "SHA1:"

echo ""
echo "Full certificate details:"
echo "========================"
keytool -list -v -keystore zen_force-release-key.keystore -alias zen_force-key-alias -storepass zenforce123
