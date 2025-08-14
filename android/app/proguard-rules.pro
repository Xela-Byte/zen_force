# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Stripe React Native ProGuard rules
-keep class com.stripe.android.** { *; }
-keep class com.stripe.android.core.** { *; }
-keep class com.stripe.android.model.** { *; }
-keep class com.stripe.android.view.** { *; }
-keep class com.stripe.android.paymentsheet.** { *; }
-keep class com.stripe.android.payments.** { *; }
-keep class com.stripe.android.financialconnections.** { *; }
-keep class com.stripe.android.identity.** { *; }
-keep class com.stripe.android.link.** { *; }
-keep class com.stripe.android.stripe3ds2.** { *; }
-keep class com.stripe.android.stripecardscan.** { *; }
-keep class com.stripe.android.stripepaymentsheet.** { *; }
-keep class com.stripe.android.stripefinancialconnections.** { *; }
-keep class com.stripe.android.stripeidentity.** { *; }
-keep class com.stripe.android.stripelink.** { *; }
-keep class com.stripe.android.stripe3ds2.** { *; }
-keep class com.stripe.android.stripecardscan.** { *; }

# Keep Stripe React Native bridge classes
-keep class com.reactnativestripesdk.** { *; }
-keep class com.reactnativestripesdk.StripeSdkPackage { *; }
-keep class com.reactnativestripesdk.StripeSdkModule { *; }
