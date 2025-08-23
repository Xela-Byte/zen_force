# Release Keystore Information

## Keystore Details

- **File**: `android/app/zen_force-release-key.keystore`
- **Store Password**: zenforce123
- **Key Alias**: zen_force-key-alias
- **Key Password**: zenforce123
- **Validity**: 10,000 days (until Jan 08, 2053)

## SHA-1 Fingerprint

```
SHA1: 49:A5:FF:8E:AE:D4:67:85:09:9B:E3:72:B5:3C:4E:A6:99:BE:3D:22
```

## SHA-256 Fingerprint

```
SHA256: 2B:E6:2A:85:68:F5:15:6C:F9:9E:EC:41:54:5A:CE:8B:AA:49:8B:AC:BA:1A:66:2C:45:21:5F:2D:9A:07:71:FA
```

## Usage

### Getting SHA-1 Fingerprint

Run the provided script:

```bash
./get-release-sha1.sh
```

Or manually:

```bash
cd android/app
keytool -list -v -keystore zen_force-release-key.keystore -alias zen_force-key-alias -storepass zenforce123
```

### Building Release APK

```bash
cd android
./gradlew assembleRelease
```

### Building Release Bundle

```bash
cd android
./gradlew bundleRelease
```

## Important Notes

1. **Keep the keystore file secure** - Back it up in a secure location
2. **Never commit keystore.properties to version control** - Add it to .gitignore
3. **Store passwords securely** - Consider using environment variables in CI/CD
4. **The SHA-1 fingerprint is required for**:
   - Google Play Console app signing
   - Firebase configuration
   - Google Sign-In setup
   - Google Maps API
   - Other Google services

## Security Recommendations

1. Store the keystore file in a secure backup location
2. Use environment variables for passwords in production builds
3. Consider using Play App Signing for additional security
4. Never share the keystore passwords in plain text communications
